import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import { Comment } from './shared/comment';
import { CommentService } from './shared/comment.service';
import { Utils } from '../../shared/utils';
import { CookieService } from 'angular2-cookie/core';
import * as Alertify from 'alertifyjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../shared/utils.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() parentID: number;
  @Input() parentType: string;
  @Input() parentIDPost: number;
  public comments: Comment[];
  public errorMessage: string;
  public rating: number;
  public message: string;
  public uploadFiles: { file?: File, id?: number, src?: string }[];
  @ViewChild('commentForm') commentForm: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;
  public avatarClass: string;
  public userAvatar: string;
  public reviewStandFor: string;
  constructor(private commentService: CommentService,
    private elementRef: ElementRef,
    private cookie: CookieService,
    private domSanitizer: DomSanitizer,
    private utilsService: UtilsService
    ) {
    this.rating = 0;
    this.message = '';
    this.avatarClass = Utils.randomColor();
    this.reviewStandFor = 'G';
    this.uploadFiles = [];
  }

  ngOnInit() {
    this.getComments(this.parentID, this.parentType);
    this.getCurrentUser();
  }
  ngOnChanges() {
    this.getComments(this.parentID, this.parentType);
    this.getCurrentUser();
  }
  /**
   * get comments of tour/tip/event
   * @param id {number} - id of type that containing comments: id of tour/tip/event
   * @param type {string} - tour/tip/event
   * call service
   * api path comments/tour?parentId={tourID}&pageNumber=1
   **/
  getComments(id: number, type: string) {
    this.commentService.getComments(id, type).subscribe( (res: any) => {
      if (res.Success && res.Data) {
        this.comments = res.Data.Items;
      } else {
        this.errorMessage = res.Message;
      }
    }, error => {
      this.errorMessage = <any> error;
    })
  }
  /**
   * write comment of tour/tip/event
   * @param parentType {string} - tour/tip/event
   * @param formData {FormData}
   * call service
   * api path comments/tour/comment
   **/
  postComment() {
    this.getRatingValue();
    const body = {
      Message: this.message,
      CreatedAt: new Date(),
      ParentId: this.parentIDPost ? this.parentIDPost : this.parentID,
      Rating: this.rating,
      MemberId: 105
    };
    const formData = new FormData();
    if (this.uploadFiles && this.uploadFiles.length) {
      for (let i = 0, len = this.uploadFiles.length; i < len; i++) {
        formData.append(this.uploadFiles[i].file.name, this.uploadFiles[i].file);
      }
    };
    let response = {};
    formData.append('model', new Blob([JSON.stringify(body)], { type: 'application/json' }));
    this.utilsService.showOverlay(true);
    this.commentService.postComment(this.parentType, formData).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      response = res;
      if (res.Success) {
        this.getComments(this.parentID, this.parentType);
        this.reInitComment();
      } else {
        this.errorMessage = res.Message ? res.Message : 'error';
      }
    }, (error: any) => {
      this.errorMessage = <any> error;
      Alertify.error(this.errorMessage);
    }, () => {
      if (response['Success']) {
        this.getComments(this.parentID, this.parentType);
        this.reInitComment();
      } else {
        Alertify.error(response['Message']);
      }
    })
  }
  /**
   * check rating
   **/
  getRatingValue() {
    const inputRating = this.commentForm.nativeElement.querySelector('input.hidden.rating');
    if (inputRating) {
      const inputData = inputRating.value;
      this.rating = parseFloat(inputData);
    }
  }
  /**
   * check total files that use to post in a comment- maximum is 5
   **/
  fileChangeEvent(fileInput: any) {
    // let files = fileInput.target.files;
    const files = fileInput.srcElement.files;
    for (let i = 0, len = files.length; i < len; i++) {
      if (this.uploadFiles.length >= 5) {
        this.errorMessage = 'Upload tối đa 5 hình';
        Alertify.error(this.errorMessage);
        break;
      }
      const fileObj = { file: files[i], id: i + 1, src : URL.createObjectURL(files[i]) };
      this.uploadFiles.push(fileObj);
    }
  }
  /**
   * addNewComment
  */
  public createComment = () => {
    if (!this.cookie.get(Utils.config.cookieKey.token)) {
      document.getElementById('login').click();
    } else if (!this.message) {
      this.errorMessage = 'Nhập nội dung bình luận';
      Alertify.error(this.errorMessage);
    } else {
      this.postComment();
    }
  }
  /**
   * get current login user
   */
  private getCurrentUser = () => {
    if (this.cookie.get(Utils.config.cookieKey.token)) {
      const userSession = JSON.parse(this.cookie.get(Utils.config.cookieKey.userInfo));
      const firstName = userSession ? userSession.FirstName : '';
      const lastName = userSession ? userSession.LastName : '';
      this.userAvatar = userSession ? userSession.PhotoUrl : '';
      this.reviewStandFor = userSession ? Utils.standForName(firstName, lastName) : 'Gues';
    }
  }
  /**
   * trigger to input type file click
   */
  public chooseFile = () => {
    this.inputFile.nativeElement.click();
  }
  /**
   * remove file
   */
  public removeFile = (index: number) => {
    if (index > -1) {
      this.uploadFiles.splice(index, 1);
    }
  }
  /**
   * re init comment
   */
  private reInitComment = () => {
    this.uploadFiles = [];
    this.message = '';
    this.rating = 0;
  }
}
