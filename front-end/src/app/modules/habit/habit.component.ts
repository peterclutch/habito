import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ha-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent {
  habitId: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.habitId = params['id'];
    });
  }

}
