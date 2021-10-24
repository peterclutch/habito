import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ModalOverlayRef } from './modal-overlay-ref';
import { HabitAddComponent } from '../../core/layout/habit-container/habit-add/habit-add.component';
import { HABITO_MODAL_DATA } from './modal.token';

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  panelClass: 'menu-panel',
  backdropClass: 'modal-background'
};

@Injectable()
export class MenuOverlayService {

  // Inject overlay service
  constructor(private injector: Injector, private overlay: Overlay) { }

  open(config: FilePreviewDialogConfig = {}, action: any = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new ModalOverlayRef(overlayRef);

    // Inject overlay ref
    const injectionTokens = new WeakMap();
    injectionTokens.set(ModalOverlayRef, dialogRef);
    injectionTokens.set(HABITO_MODAL_DATA, action)
    const injector = new PortalInjector(this.injector, injectionTokens);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(HabitAddComponent, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    // Subscribe to a stream that emits when the backdrop was clicked
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    // Return remote control
    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }
}
