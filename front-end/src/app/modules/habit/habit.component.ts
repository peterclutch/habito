import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '../../shared/model/action.model';
import { HabitService } from '../../shared/service/habit.service';
import { Habit, IHabit } from '../../shared/model/habit.model';
import { Routes } from '../../routes';
import { MenuOverlayService } from '../../shared/modal/menu-overlay.service';
import { ConfirmModalComponent } from '../../shared/modal/confirm-modal/confirm-modal.component';
import { HabitCheckService } from '../../shared/service/habit-check.service';

@Component({
  selector: 'ha-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnInit {

  actions = [
    Action.create<IHabit>({
      label: 'Edit',
      icon: 'ic-edit',
      executor: (entity) => {}
    }),
    Action.create<IHabit>({
      label: 'Delete',
      icon: 'ic-delete',
      executor: (entity) => {
        if (entity) {
          this.menuOverlayService.open({}, () => {
            this.habitService.delete(entity.id).subscribe(() => {
              this.habitService.updateHabits();
              this.router.navigate([Routes.home()]);
            });
          }, ConfirmModalComponent)
        }
      }
    })
  ];

  habit: IHabit = Habit.newEmpty();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitService: HabitService,
    private habitCheckService: HabitCheckService,
    private menuOverlayService: MenuOverlayService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.habit = data.habit;
    });
  }

  createCheck(): void {
    // TODO
    this.habitCheckService.create({
      id: 0,
      habitId: this.habit.id,
      date: new Date("2021-11-16")
    }).subscribe(habit => {
      this.habit = habit;
    })
  }

  deleteCheck(id: number): void {
    this.habitCheckService.delete(id).subscribe(() => {
      this.habit.checks = this.habit.checks.filter(check => check.id != id)
    })
  }

}
