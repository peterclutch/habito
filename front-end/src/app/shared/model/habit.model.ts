import { HabitCheck, IHabitCheck } from './habit-check.model';

export interface IHabit {
  id: number;
  icon: string;
  title: string;
  checks: IHabitCheck[];
}

export class Habit implements IHabit {
  private constructor(
    public id: number,
    public icon: string,
    public title: string,
    public checks: HabitCheck[]
  ) {
  }

  public static newEmpty(): Habit {
    return new Habit(0, '', '', []);
  }
}
