export class Routes {

  // GENERAL
  public static root(): string {
    return '/';
  }

  public static home(): string {
    return '/home';
  }

  public static login(): string {
    return '/login';
  }

  public static resetRequest(): string {
    return '/login/reset';
  }

  // ERROR
  public static accessDenied(): string {
    return '/access-denied';
  }

  public static notFound(): string {
    return '/404';
  }

  public static error(): string {
    return '/error';
  }

  // ACCOUNT
  public static accountView(): string {
    return '/account/view';
  }

  public static accountEdit(): string {
    return '/account/edit';
  }

  public static accountPassword(): string {
    return '/account/password';
  }

  // MODULES
  public static habits(id: number): string {
    return `/habits/${id}`;
  }
}
