import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyCustomPipe } from './currency-custom.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CurrencyCustomPipe, SearchFilterPipe],
  exports: [CurrencyCustomPipe, SearchFilterPipe]
})
export class PipesModule { }
