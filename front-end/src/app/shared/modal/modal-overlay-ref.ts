import { OverlayRef } from '@angular/cdk/overlay';

export class ModalOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
