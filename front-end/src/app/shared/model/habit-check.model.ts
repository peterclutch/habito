export interface IHabitCheck {
  id: number;
  habitId: number;
  date: Date;
}

export class HabitCheck implements IHabitCheck {
  private constructor(
    public id: number,
    public habitId: number,
    public date: Date
  ) {
  }
}
