import { Component, Input, OnInit } from '@angular/core';
import { IHabitCheck } from '../../../model/habit-check.model';
import { HabitCheckService } from '../../../service/habit-check.service';

@Component({
  selector: 'ha-month-display',
  templateUrl: './month-display.component.html',
  styleUrls: ['./month-display.component.scss']
})
export class MonthDisplayComponent implements OnInit {

  @Input() checks: IHabitCheck[] = [];
  @Input() habitId: number | undefined;

  daysInMonths: Date[] = [];
  currentDate: Date = new Date();

  constructor(
    private habitCheckService: HabitCheckService
  ) {
  }

  ngOnInit(): void {
    this.daysInMonths = this.getDaysInCurrentMonth();
  }

  getDaysInCurrentMonth(): Date[] {
    const currentDate: Date = new Date();
    return this.getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
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
}
