import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ModalOverlayRef} from "../modal-overlay-ref";
import {ButtonType} from "../../directive/button/button.directive";
import {HABITO_MODAL_DATA} from "../modal.token";

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  _degree: number = 0;
  buttonType = ButtonType;

  constructor(
    public modalRef: ModalOverlayRef,
    @Inject(HABITO_MODAL_DATA) public action: (data: any) => void
  ) { }

  confirm(): void {
    this.close();
    this.action(null);
  }

  close(): void {
    this.modalRef.close();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close();
  }
}
