import {Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'ha-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  _degree: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private accountService: AccountService
  ) { }


  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });

    setInterval(() => {
      this._degree = this._degree >= 360 ? 0 : this._degree + 2;
    }, 80);
  }

  get degree(): string {
    return `${this._degree}deg`;
  }

  login(): void {
    this.loading = true;
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      })
      .subscribe(
        () => {
          if (!this.router.getCurrentNavigation()) {
            // No routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

  reset() {
    // this.router.navigate([MinkeRoutes.resetRequest()]);
  }
}
