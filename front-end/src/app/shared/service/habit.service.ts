import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { IHabit } from '../model/habit.model';

@Injectable({ providedIn: 'root' })
export class HabitService {

  private _habits: BehaviorSubject<IHabit[]>;

  constructor(
    private http: HttpClient
  ) {
    this._habits = new BehaviorSubject<IHabit[]>([]);
  }

  updateHabits() {
    this.getAll().subscribe((habits: IHabit[]) => {
      this._habits.next(habits);
    });
  }

  get habits(): Observable<IHabit[]> {
    this.updateHabits();
    return this._habits.asObservable();
  }

  getAll(): Observable<IHabit[]> {
    return this.http.get<IHabit[]>(`${SERVER_API_URL}api/habits`, { observe: 'body' });
  }

  get(id: number) {
    return this.http.get<IHabit>(`${SERVER_API_URL}api/habits/${id}`, { observe: 'body' });
  }

  create(habit: IHabit): Observable<IHabit> {
    return this.http.post<IHabit>(SERVER_API_URL + 'api/habits', habit, { observe: 'body' });
  }

  delete(id: number) {
    return this.http.delete(`${SERVER_API_URL}api/habits/${id}`, { observe: 'body' });
  }

}
