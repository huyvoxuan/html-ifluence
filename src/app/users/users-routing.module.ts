import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserVoucherComponent } from './user-info/user-voucher/user-voucher.component';
import { UserTourComponent } from './user-info/user-tour/user-tour.component';
import { UserAccountComponent } from './user-info/user-account/user-account.component';
const userState = [
  { name: 'user', url: '/user', component: UserInfoComponent },
  { name: 'user.account', url: '/account', component: UserAccountComponent },
  { name: 'user.voucher', url: '/voucher', component: UserVoucherComponent },
  { name: 'user.tour', url: '/tour', component: UserTourComponent }
]
@NgModule({
  imports: [
    UIRouterModule.forChild({ states: userState })
  ],
  exports: [
    UIRouterModule
  ]
})
export class UsersRoutingModule {}
