import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../model/account.model';

@Pipe({name: 'initials'})
export class InitialsPipe implements PipeTransform {

  transform(value: Account | null): string {
    if (value == null) {
      return '';
    }
    return value.firstName.charAt(0) + value.lastName.charAt(0);
  }
}
