import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IHabitCheck } from '../../../model/habit-check.model';

@Component({
  selector: 'ha-month-display',
  templateUrl: './month-display.component.html',
  styleUrls: ['./month-display.component.scss']
})
export class MonthDisplayComponent implements OnInit, OnChanges {

  @Input() checks: IHabitCheck[] = [];
  @Input() habitId: number | undefined;

  currentDate: Date = new Date()
  minDate: Date = this.currentDate;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    this.minDate = new Date(Math.min(this.maxMinDate(this.currentDate), ...this.checks.map(check => new Date(check.date))));
  }

  getYears(currentDate: Date, minDate: Date): number[] {
    const years: number[] = [];
    for (let i = minDate.getFullYear(); i <= currentDate.getFullYear(); i++) {
      years.push(i);
    }
    return years;
  }

  getMonths(year: number, currentDate: Date, minDate: Date): number[] {
    const months: number[] = [];

    let minMonth = year == minDate.getFullYear() ? minDate.getMonth() : 0;
    let maxMonth = year == currentDate.getFullYear() ? currentDate.getMonth() : 11;

    for (let i = minMonth; i <= maxMonth; i++) {
      months.push(i);
    }
    return months;
  }

  maxMinDate(currentDate: Date): Date {
    const maxMinDate = new Date(currentDate);
    maxMinDate.setMonth(maxMinDate.getMonth() - 1);
    return maxMinDate;
  }
}
