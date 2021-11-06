import { Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ModalOverlayRef } from './modal-overlay-ref';
import { HabitAddModalComponent } from './habit-add-modal/habit-add-modal.component';
import { HABITO_MODAL_DATA } from './modal.token';

interface ModalConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: ModalConfig = {
  hasBackdrop: true,
  panelClass: 'menu-panel',
  backdropClass: 'modal-background'
};

@Injectable()
export class MenuOverlayService {

  // Inject overlay service
  constructor(private injector: Injector, private overlay: Overlay) { }

  open(config: ModalConfig = {}, action: any = {}, modal: ComponentType<any> = HabitAddModalComponent) {
    // Override default configuration
    const modalConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(modalConfig);

    // Instantiate remote control
    const dialogRef = new ModalOverlayRef(overlayRef);

    // Inject overlay ref
    const injectionTokens = new WeakMap();
    injectionTokens.set(ModalOverlayRef, dialogRef);
    injectionTokens.set(HABITO_MODAL_DATA, action)
    const injector = new PortalInjector(this.injector, injectionTokens);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(modal, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    // Subscribe to a stream that emits when the backdrop was clicked
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    // Return remote control
    return dialogRef;
  }

  private createOverlay(config: ModalConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: ModalConfig): OverlayConfig {
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
