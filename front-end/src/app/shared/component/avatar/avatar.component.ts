import {Component, Input, OnInit} from '@angular/core';

export enum AvatarSize {
  SMALL= 'small',
  LARGE = 'large'
}

@Component({
  selector: 'ha-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() initials: string = '';
  @Input() size = AvatarSize.SMALL;

  _degree: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this._degree = this._degree >= 360 ? 0 : this._degree + 1;
    }, 80);
  }

  get degree(): string {
    return `${this._degree}deg`;
  }
}
