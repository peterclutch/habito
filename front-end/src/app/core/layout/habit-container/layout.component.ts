import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../../routes';

@Component({
  selector: 'ha-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private router: Router) {
  }

  public toAccount() {
    this.router.navigate([Routes.accountView()]);
  }
}
