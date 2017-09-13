import { Component, OnInit, Input } from '@angular/core';
import { Comment, CommentItem } from '../shared/comment';
import { Utils } from '../../utils';
@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: CommentItem;
  public standforName: string;
  public avatarClass: string;
  public commentTime: {minute: boolean, hour: boolean, day: boolean, value: number};
  public commentPhotos: Object[];
  constructor() {
    this.standforName = '';
    this.avatarClass = '';
    this.commentTime = {minute: false, hour: false, day: false, value: 0};
  }

  ngOnInit() {
    this.standForReviewer();
    this.getDifferentTime();
    this.getCommentPhotos();
  }
  /**
   * get stand for name of reviewer
   */
  standForReviewer() {
    if (this.comment && (this.comment.MemberFirstName || this.comment.MemberLastName)) {
      this.standforName = Utils.standForName(this.comment.MemberFirstName, this.comment.MemberLastName);
      this.avatarClass = Utils.randomColor();
    }
  }
  /**
   * get different time - default hour unit
   */
  getDifferentTime() {
    const time = Utils.differentTime(this.comment.CreatedAt);
    if ( time < 1 ) {
      this.commentTime['minute'] = true;
      this.commentTime['value'] = Math.abs( Math.round( time * 60 ) );
    } else if ( time > 24 ) {
      this.commentTime['day'] = true;
      this.commentTime['value'] = Math.round( time / 24 );
    } else {
      this.commentTime['hour'] = true;
      this.commentTime['value'] = Math.round( time );
    }
  }
  /**
   * get photos of comment
   */
  getCommentPhotos() {
    if (this.comment && this.comment.Photo4Reviews) {
      this.commentPhotos = this.comment.Photo4Reviews;
    }
  }
}
