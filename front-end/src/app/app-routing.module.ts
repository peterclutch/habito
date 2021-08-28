import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HabitComponent } from './modules/habit/habit.component';
import { LoginComponent } from './modules/login/login.component';
import { AccountViewComponent } from './modules/account/account-view/account-view.component';
import {AuthoritiesGuard} from "./core/auth/authorities.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    data: {
      isMenuHidden: true
    }
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthoritiesGuard],
  },
  {
    path: 'account',
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'prefix'
      },
      {
        path: 'view',
        component: AccountViewComponent,
        data: {
          authorities: [],
        },
        canActivate: [AuthoritiesGuard],
      }
    ]
  },
  {
    path: 'habits/:id',
    component: HabitComponent,
    canActivate: [AuthoritiesGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
