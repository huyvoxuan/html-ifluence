import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingComponent } from './paging.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PagingComponent],
  exports: [PagingComponent]
})
export class PagingModule { }
