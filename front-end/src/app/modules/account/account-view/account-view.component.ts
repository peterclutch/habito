import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Routes } from '../../../routes';
import { Router } from '@angular/router';

@Component({
  selector: 'ha-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate([Routes.login()]);
  }

}
