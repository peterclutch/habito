export interface IAction<T> {
  label: string;
  icon: string;
  executor: Executor<T>;
  execute(entity?: T): void;
}

export type Executor<T> = (entity?: T) => void;

export class Action<T> implements IAction<T> {
  private constructor(
    public label: string,
    public icon: string,
    public executor: (entity?: T) => void
  ) {}

  static create<T>(action: {
    label: string;
    icon: string;
    executor: (entity?: T) => void;
  }) {
    return new Action(action.label, action.icon, action.executor);
  }

  execute(entity?: T): void {
    this.executor(entity);
  }

}
