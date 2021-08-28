import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './core/layout/main/main.component';
import { LayoutComponent } from './core/layout/habit-container/layout.component';
import { AvatarComponent } from "./shared/components/avatar/avatar.component";
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CardComponent } from './shared/components/card/card.component';
import { HabitComponent } from './modules/habit/habit.component';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from './shared/components/form/label/label.component';
import { TextComponent } from './shared/components/form/text/text.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from './shared/icons/icon.constants';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CookieModule } from 'ngx-cookie';
import { AccountViewComponent } from './modules/account/account-view/account-view.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { httpInterceptorProviders } from './core/interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    MainComponent,
    LayoutComponent,
    AvatarComponent,
    DashboardComponent,
    CardComponent,
    HabitComponent,
    LoginComponent,
    LabelComponent,
    TextComponent,
    LoaderComponent,
    AccountViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    CookieModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    httpInterceptorProviders
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
