import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDateComponent } from './range-date.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    Daterangepicker,
    TranslateModule.forRoot()
  ],
  declarations: [RangeDateComponent],
  exports: [RangeDateComponent]
})
export class RangeDateModule { }
