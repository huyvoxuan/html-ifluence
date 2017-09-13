import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeComponent } from './like.component';
import { LikeService } from './shared/like.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LikeComponent],
  providers: [LikeService],
  exports: [LikeComponent]
})
export class LikeModule { }
