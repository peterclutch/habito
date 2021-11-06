import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './core/layout/main/main.component';
import { LayoutComponent } from './core/layout/habit-container/layout.component';
import { AvatarComponent } from './shared/component/avatar/avatar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CardComponent } from './shared/component/card/card.component';
import { HabitComponent } from './modules/habit/habit.component';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from './shared/component/form/label/label.component';
import { TextComponent } from './shared/component/form/text/text.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from './shared/icon/icon.constants';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { CookieModule } from 'ngx-cookie';
import { AccountViewComponent } from './modules/account/account-view/account-view.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { httpInterceptorProviders } from './core/interceptor';
import { InitialsPipe } from './shared/pipe/initials.pipe';
import { MenuOverlayService } from './shared/modal/menu-overlay.service';
import { HabitAddModalComponent } from './shared/modal/habit-add-modal/habit-add-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonDirective } from './shared/directive/button/button.directive';
import { EmojiPickerComponent } from './shared/component/form/emoji-picker/emoji-picker.component';
import { DotMenuComponent } from './shared/component/dot-menu/dot-menu.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ConfirmModalComponent } from './shared/modal/confirm-modal/confirm-modal.component';

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
    AccountViewComponent,
    InitialsPipe,
    HabitAddModalComponent,
    ButtonDirective,
    EmojiPickerComponent,
    DotMenuComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NzPopoverModule,
    CookieModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    OverlayModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    httpInterceptorProviders,
    MenuOverlayService
  ],
  bootstrap: [MainComponent],
  entryComponents: [
    HabitAddModalComponent
  ]
})
export class AppModule { }
