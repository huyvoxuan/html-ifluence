import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputDropdownComponent } from './input-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot()
  ],
  declarations: [InputDropdownComponent],
  exports: [InputDropdownComponent]
})
export class InputDropdownModule { }
