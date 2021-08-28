import { Component, Input } from '@angular/core';

export enum LabelType {
  DEFAULT = 'default',
  INFORMATIVE = 'informative'
}

@Component({
  selector: 'ha-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() type = LabelType.DEFAULT;
  @Input() for: string = '';
  @Input() error: boolean = false;
  @Input() optional: boolean = false;

}
