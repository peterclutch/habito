import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Habit } from '../model/habit.model';
import { HabitService } from '../service/habit.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HabitResolver implements Resolve<Habit> {
  constructor(
    private habitService: HabitService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Habit> {
    const id = route.params.id;
    return this.habitService.get(id).pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
