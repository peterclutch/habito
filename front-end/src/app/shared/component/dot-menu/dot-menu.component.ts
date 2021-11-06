import { Component, Input } from '@angular/core';
import { IAction } from '../../model/action.model';

@Component({
  selector: 'ha-dot-menu',
  templateUrl: './dot-menu.component.html',
  styleUrls: ['./dot-menu.component.scss']
})
export class DotMenuComponent {

  @Input() actions: IAction<any>[] = [];
  @Input() entity: any;
  visible = false;

  onEvent(event: MouseEvent) {
    event.stopPropagation();
  }

  actionClick(action: IAction<any>, event: MouseEvent) {
    this.visible = false;
    action.execute(this.entity);
    this.onEvent(event);
  }

}
