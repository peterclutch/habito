import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../model/habit.model';

@Injectable({ providedIn: 'root' })
export class HabitService {

  private _habits: BehaviorSubject<Habit[]>;

  constructor(
    private http: HttpClient
  ) {
    this._habits = new BehaviorSubject<Habit[]>([]);
  }

  updateHabits() {
    this.getAll().subscribe((habits: Habit[]) => {
      this._habits.next(habits);
    });
  }

  get habits(): Observable<Habit[]> {
    this.updateHabits();
    return this._habits.asObservable();
  }

  getAll(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${SERVER_API_URL}api/habits`, { observe: 'body' });
  }

  get(id: number) {
    return this.http.get<Habit>(`${SERVER_API_URL}api/habits/${id}`, { observe: 'body' });
  }

  create(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(SERVER_API_URL + 'api/habits', habit, { observe: 'body' });
  }

  delete(id: number) {
    return this.http.delete(`${SERVER_API_URL}api/habits/${id}`, { observe: 'body' });
  }

}
