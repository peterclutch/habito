import { Component, Input, OnInit } from '@angular/core';
import { IHabitCheck } from '../../../../model/habit-check.model';
import { HabitCheckService } from '../../../../service/habit-check.service';

@Component({
  selector: 'ha-single-month-display',
  templateUrl: './single-month-display.component.html',
  styleUrls: ['./single-month-display.component.scss']
})
export class SingleMonthDisplayComponent implements OnInit {

  @Input() checks: IHabitCheck[] = [];
  @Input() habitId: number | undefined;
  @Input() month: number = 0;
  @Input() year: number = 0;

  daysInMonths: Date[] = [];
  currentDate: Date = new Date();

  constructor(
    private habitCheckService: HabitCheckService
  ) {
  }

  ngOnInit(): void {
    this.daysInMonths = this.getDaysInMonth(this.year, this.month);
  }

  getDaysInMonth(year: number, month: number): Date[] {
    const date: Date = new Date(year, month, 1);
    const days: Date[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  isSameDate(date1: Date, date2: Date) {
    return date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth()
      && date1.getDate() == date2.getDate();
  }

  isChecked(date: Date, checkedDates: IHabitCheck[]): boolean {
    return checkedDates.some(checkedDate => this.isSameDate(new Date(checkedDate.date), date));
  }

  isToday(date: Date): boolean {
    return this.isSameDate(date, this.currentDate);
  }

  createCheck(date: Date): void {
    if (!this.habitId || this.isChecked(date, this.checks)) {
      return;
    }

    this.habitCheckService.create({
      id: 0,
      habitId: this.habitId,
      date: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    }).subscribe(habit => {
      this.checks = habit.checks;
    })
  }

  deleteCheck(date: Date): void {
    if (!this.habitId || !this.isChecked(date, this.checks)) {
      return;
    }

    const habitToDelete: IHabitCheck | undefined = this.checks.find(check => this.isSameDate(date, new Date(check.date)));

    if (!habitToDelete) {
      return;
    }

    this.habitCheckService.delete(habitToDelete.id).subscribe(() => {
      this.checks = this.checks.filter(check => check.id != habitToDelete.id)
    })
  }

  getFirstDayOfMonth(date: Date): number {
    const day = date.getDay();
    return day == 0 ? 7 : day;
  }
}
