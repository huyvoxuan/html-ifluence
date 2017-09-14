
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';

const mainStates = [
  { name: 'main', url: '/', redirectTo: 'paymentSummary' },
  { name: 'home', url: 'onboard', component: HomeComponent },
  { name: 'registration', url: '/registration', component: RegistrationComponent },
  { name: 'paymentSummary', url: '/payment', component: PaymentSummaryComponent }
]

@NgModule({
  imports: [
    UIRouterModule.forRoot({ states: mainStates})
  ],
  exports: [
    UIRouterModule
  ]
})
export class AppRoutingModule {}
