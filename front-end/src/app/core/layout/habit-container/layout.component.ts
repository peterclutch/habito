import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../../routes';
import { AccountService } from '../../auth/account.service';
import { Account } from '../../../shared/models/account.model';
import { HabitService } from '../../../shared/service/habit.service';
import { Habit } from '../../../shared/models/habit.model';

@Component({
  selector: 'ha-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  account: Account | null = null;
  habits: Habit[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private habitService: HabitService
  ) {}

  toAccount() {
    this.router.navigate([Routes.accountView()]);
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    this.habitService.getAll().subscribe(habits => {
      this.habits = habits;
    })
  }

  createHabit(): void {
    this.habitService.create({
      title: 'testy',
      icon: '🍆'
    }).subscribe(habit => {
      this.habits.push(habit);
    });
  }

  deleteHabit(id: number | undefined): void {
    if (id) {
      this.habitService.delete(id).subscribe(() => {
        this.habits = this.habits.filter(habit => habit.id != id);
      })
    }
  }
}
