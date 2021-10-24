import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[haButton]'
})
export class ButtonDirective implements OnChanges {
  @Input() public haButtonType: ButtonType = ButtonType.HERO_PRIMARY;

  public buttonTypeToClass = new Map<ButtonType, string>([
    [ButtonType.HERO_PRIMARY, 'hero hero-primary'],
    [ButtonType.HERO_SECONDARY, 'hero hero-secondary'],
  ]);

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (!ButtonType[this.haButtonType]) {
      throw new Error(`'${this.haButtonType}' is not a valid value for enum ButtonType`);
    }

    const wrappingSpan = this.renderer.createElement('span');

    wrappingSpan.className += `ha-button`;

    const wrappedElement = this.elementRef.nativeElement;
    this.elementRef.nativeElement.className =
      (`${this.elementRef.nativeElement.className} `
        + `${this.buttonTypeToClass.get(this.haButtonType)}`).trim();
    const parent = wrappedElement.parentNode;
    this.renderer.insertBefore(parent, wrappingSpan, wrappedElement);

    this.renderer.appendChild(wrappingSpan, wrappedElement);
  }
}

export enum ButtonType {
  HERO_PRIMARY = 'HERO_PRIMARY',
  HERO_SECONDARY = 'HERO_SECONDARY',
}
