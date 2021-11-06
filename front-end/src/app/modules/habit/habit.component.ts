import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '../../shared/model/action.model';
import { HabitService } from '../../shared/service/habit.service';
import { Habit } from '../../shared/model/habit.model';
import { Routes } from '../../routes';
import { MenuOverlayService } from '../../shared/modal/menu-overlay.service';
import { ConfirmModalComponent } from '../../shared/modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'ha-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnInit {

  actions = [
    Action.create<Habit>({
      label: 'Edit',
      icon: 'ic-edit',
      executor: () => {}
    }),
    Action.create<Habit>({
      label: 'Delete',
      icon: 'ic-delete',
      executor: (entity) => {
        if (entity?.id) {
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

  habit: Habit | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitService: HabitService,
    private menuOverlayService: MenuOverlayService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.habit = data.habit;
    });
  }

}
