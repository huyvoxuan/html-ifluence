import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingComponent } from './booking.component';
import { NumberChangingModule } from '../shared/number-changing/number-changing.module';
import { VoucherService } from './shared/voucher.service';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputDateModule } from './../shared/input-date/input-date.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NumberChangingModule,
    DatepickerModule.forRoot(),
    InputDateModule,
    PipesModule,
    SharedModule,
    TranslateModule.forRoot()
  ],
  declarations: [BookingComponent],
  exports: [BookingComponent],
  providers: [VoucherService]
})
export class BookingModule { }
