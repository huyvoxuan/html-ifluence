import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputDateComponent } from './input-date.component';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatepickerModule.forRoot()
  ],
  declarations: [InputDateComponent],
  exports: [InputDateComponent]
})
export class InputDateModule { }
