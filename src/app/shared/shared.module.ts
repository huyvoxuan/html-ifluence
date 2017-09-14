import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../shared/overlay/overlay.component';
import { UtilsService } from './utils.service';
/*import { CurrencyCustomDirective } from './directives/currency-custom.directive';*/
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OverlayComponent/*, CurrencyCustomDirective*/],
  exports: [OverlayComponent],
  providers: [UtilsService]
})
export class SharedModule { }
