export interface IIcon {
  name: string;
  theme: 'outline';
  icon: string;
}

export class Icon implements IIcon {
  static create(icon: {
    name: string;
    icon: string;
  }) {
    return new Icon(
      icon.name,
      icon.icon,
      'outline'
    );
  }

  private constructor(
    public name: string,
    public icon: string,
    public theme: 'outline'
  ) {}
}

