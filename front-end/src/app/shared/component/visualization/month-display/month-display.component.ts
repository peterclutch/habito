import { Component, Input, OnInit } from '@angular/core';
import { IHabitCheck } from '../../../model/habit-check.model';

@Component({
  selector: 'ha-month-display',
  templateUrl: './month-display.component.html',
  styleUrls: ['./month-display.component.scss']
})
export class MonthDisplayComponent implements OnInit {

  @Input() checks: IHabitCheck[] = [];
  @Input() habitId: number | undefined;

  ngOnInit(): void {
  }
}
