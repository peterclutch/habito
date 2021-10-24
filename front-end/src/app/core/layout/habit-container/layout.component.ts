import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../../routes';
import { AccountService } from '../../auth/account.service';
import { Account } from '../../../shared/model/account.model';
import { HabitService } from '../../../shared/service/habit.service';
import { Habit } from '../../../shared/model/habit.model';
import { MenuOverlayService } from '../../../shared/modal/menu-overlay.service';

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
    private habitService: HabitService,
    private menuOverlayService: MenuOverlayService
  ) {}

  showMenu() {
    this.menuOverlayService.open({}, (habit: Habit) => { this.habits.push(habit); });
  }

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
}
