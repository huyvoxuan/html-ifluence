import { Component, OnInit, OnDestroy, Input, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LikeService } from './shared/like.service';
import { Utils } from '../../shared/utils';
import { Subscription } from 'rxjs/Subscription';
import * as Alertify from 'alertifyjs';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit, OnDestroy {
  @Input() isLiked: boolean;
  @Input() type: string;
  @Input() parentID: number;
  @ViewChild('btnLike') btnLike: ElementRef;
  public like: number;
  public errorMessage: string;
  public subscriptionLikeAttraction: Subscription;

  constructor(private likeService: LikeService,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private cookie: CookieService) {
    this.like = 1;
    this.errorMessage = '';
    this.subscriptionLikeAttraction = new Subscription();
  }

  ngOnInit() {
    this.initEventOfElement();
  }
  ngOnDestroy() {
    this.subscriptionLikeAttraction.unsubscribe();
  }
  /**
   * like/unlike a tour/ attraction / event
   * call api
  **/
  sendLikeOrUnlike() {
    if (this.cookie.get(Utils.config.cookieKey.token)) {
      if (this.isLiked) {
        this.like = 0;
      } else {
        this.like = 1;
      }
      this.subscriptionLikeAttraction =  this.likeService.postLikeOrUnlike(this.type, this.parentID, this.like).subscribe( (res: any) => {
        if (res && res.Success) {
          if (this.like) {
            this.isLiked = true;
          } else {
            this.isLiked = false;
          }
        }
      }, error => {
        this.errorMessage = <any> error;
      })
    }
    else {
      Alertify.error('Vui lòng đăng nhập trước');
    }
  }
  /**
   * binding event for like button
   * only user logged in can like/unlike a post
  **/
  initEventOfElement() {
    this.renderer.listen(this.btnLike.nativeElement, 'click', (event: any) => { this.sendLikeOrUnlike(); });
  }
}
