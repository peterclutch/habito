import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../models/habit.model';

@Injectable({ providedIn: 'root' })
export class HabitService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${SERVER_API_URL}api/habits`, { observe: 'body' });
  }

  create(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(SERVER_API_URL + 'api/habits', habit, { observe: 'body' });
  }

  delete(id: number) {
    return this.http.delete(`${SERVER_API_URL}api/habits/${id}`, { observe: 'body' });
  }

}
