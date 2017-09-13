import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UtilsService } from '../shared/utils.service';
import { Subscription } from 'rxjs';
import { Utils } from '../shared/utils';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  public isShowMoreBtn: boolean;
  private subscriptionHideItem: Subscription;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(
    private utilsService: UtilsService) {
    this.isShowMoreBtn = true;
    this.subscriptionHideItem = new Subscription();
    this.bannerConf = { bannerImg: Utils.config.bannerImage.home, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.subscriptionHideItem = this.utilsService.isHidden.subscribe( (res: boolean) => {
      this.isShowMoreBtn = res;
    });
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  ngOnDestroy() {
    this.subscriptionHideItem.unsubscribe();
  }
  viewMore() {
    this.utilsService.setHiddenItem(false);
  }
}
