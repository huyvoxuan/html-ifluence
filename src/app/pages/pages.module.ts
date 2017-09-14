import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [HomeComponent, RegistrationComponent, PaymentSummaryComponent],
  exports: [HomeComponent, RegistrationComponent]
})
export class PagesModule { }
