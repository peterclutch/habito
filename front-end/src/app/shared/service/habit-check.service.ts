import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { IHabit } from '../model/habit.model';
import { IHabitCheck } from '../model/habit-check.model';

@Injectable({ providedIn: 'root' })
export class HabitCheckService {

  constructor(private http: HttpClient) {}

  create(habitCheck: IHabitCheck): Observable<IHabit> {
    return this.http.post<IHabit>(SERVER_API_URL + 'api/habits/check', habitCheck, { observe: 'body' });
  }

  delete(id: number) {
    return this.http.delete(`${SERVER_API_URL}api/habits/check/${id}`, { observe: 'body' });
  }

}
