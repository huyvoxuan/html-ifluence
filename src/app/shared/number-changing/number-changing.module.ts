import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberChangingComponent } from './number-changing.component';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: [NumberChangingComponent],
  exports: [NumberChangingComponent]
})
export class NumberChangingModule { }
