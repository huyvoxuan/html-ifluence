import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './comments.component';
import { CommentService } from './shared/comment.service';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { RatingsModule } from '../ratings/ratings.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    RatingsModule,
    FormsModule,
    TranslateModule.forRoot()
  ],
  declarations: [CommentsComponent, CommentItemComponent],
  exports: [CommentsComponent, CommentItemComponent],
  providers: [CommentService]
})
export class CommentsModule { }
