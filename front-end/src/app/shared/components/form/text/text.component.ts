import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ha-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    }
  ]
})
export class TextComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() disabled: boolean = false;
  @Input() maxlength: number = 50;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string | null = null;
  @Input() id: string = '';
  @Input() prefixIcon: string = '';
  @Input() capitalize: boolean = false;
  @Input() autoSelect: boolean = false;
  @Input() error: boolean = false;
  @ViewChild('input') input!: ElementRef;

  onChange: any = () => {};
  private onTouch: any = () => {};

  ngOnInit(): void {
    if (this.capitalize && this.value) {
      this.value = TextComponent.capitalizeValue(this.value);
    }
  }

  ngAfterViewInit(): void {
    if (this.autoSelect) {
      setTimeout(() => {
        this.input.nativeElement.select();
      }, 500);
    }
  }

  handleChange(val: string | null) {
    if (this.isEmpty(val)) {
      this.value = null;
      this.onChange(null);
    } else {
      if (this.capitalize && val) {
        this.value = TextComponent.capitalizeValue(val);
      } else {
        this.value = val;
      }
      this.onChange(val);
    }
  }

  handleDelete() {
    this.value = null;
    this.handleChange(this.value);
  }

  private static capitalizeValue(value: string): string {
    return value.replace(/(^|[ -])(\w)/g, s => s.toUpperCase());
  }

  isEmpty(val: string | null): boolean {
    return val === undefined || val === null || val === '';
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
