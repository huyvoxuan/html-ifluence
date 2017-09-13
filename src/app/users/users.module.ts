import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthService } from './shared/auth.service';
import { BaseService } from '../../app/shared/base.service';
import { UserLoggedinComponent } from './user-loggedin/user-loggedin.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { UsersRoutingModule } from './users-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserTourComponent } from './user-info/user-tour/user-tour.component';
import { UserVoucherComponent } from './user-info/user-voucher/user-voucher.component';
import { UserAccountComponent } from './user-info/user-account/user-account.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    PipesModule,
    TranslateModule.forRoot()
  ],
  declarations: [UserLoginComponent, UserLoggedinComponent, UserRegisterComponent, UserInfoComponent, UserTourComponent, UserVoucherComponent, UserAccountComponent],
  exports: [UserLoginComponent, UserLoggedinComponent, UserRegisterComponent],
  providers: [AuthService, BaseService, CookieService]
})
export class UsersModule { }
