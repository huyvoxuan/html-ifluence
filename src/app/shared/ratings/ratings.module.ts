import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingsComponent } from './ratings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RatingsComponent],
  exports: [RatingsComponent]
})
export class RatingsModule { }
