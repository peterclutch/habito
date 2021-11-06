import { Component, ElementRef, forwardRef, Inject, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { allEmojis } from '../../../constant/emoji.constants';

@Component({
  selector: 'ha-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EmojiPickerComponent)
    }
  ]
})
export class EmojiPickerComponent implements ControlValueAccessor {

  constructor(elementRef: ElementRef, @Optional() @Inject(DOCUMENT) private document: any) {
    this.emojiPicker = elementRef.nativeElement;
  }
  @Input() selected: string | null = null;

  emojis = allEmojis;
  toggled = false;
  private readonly emojiPicker: HTMLElement;

  private static isEmojiPickerElement(element: Element): boolean {
    return (
      element.classList &&
      (element.classList.contains('emoji')
        || element.classList.contains('display'))
    );
  }

  onChange: any = () => {};
  private onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  handleChange(val: string) {
    this.selected = val;
    this.onChange(val);
  }

  onMouseClick(event: Event) {
    const inputSource = this.getInputSource(event);
    if (this.toggled && inputSource && !EmojiPickerComponent.isEmojiPickerElement(inputSource)) {
      this.toggled = false;
    }
  }

  private getInputSource(event: Event): Element {
    let inputSource: Element | null = event.target as Element;
    if (inputSource.tagName === 'svg' || inputSource.tagName === 'path') {
      const filteredPath = event.composedPath().filter(e => {
        const current = e as Element;
        return current.classList && current.classList.contains('display');
      });

      if (filteredPath.length === 1) {
        const searchBox = filteredPath[0] as Element;
        inputSource = searchBox.firstElementChild;
      }
    }

    return <Element>inputSource;
  }
}
