import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { UtilsService } from '../../shared/utils.service';
import * as Alertify from 'alertifyjs';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tour-state',
  templateUrl: './tour-state.component.html',
  styleUrls: ['./tour-state.component.css']
})
export class TourStateComponent implements OnInit, OnDestroy {
  public state: Object;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  public tourStateURL: string;
  private categoryID: number;
  private subscriptionSeoState = new Subscription();
  private subscriptionStateDetail = new Subscription();
  constructor(
    private utilsService: UtilsService,
    private baseService: BaseService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.initURL();
    this.subscriptionSeoState = this.utilsService.getSeoState.subscribe( (res: Object) => {
      this.tourStateURL = res['link'];
      this.categoryID = res['id'];
    });

  }

  ngOnInit() {
    this.gettourByCategory();
  }
  ngOnDestroy() {
    this.subscriptionSeoState.unsubscribe();
    this.subscriptionStateDetail.unsubscribe();
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  private initURL = () => {
    let stateSession = sessionStorage.getItem(Utils.config.sessionKey.stateFooter);
    if (stateSession) {
      const stateObj = JSON.parse(stateSession);
      this.tourStateURL = stateObj['link'];
      this.categoryID = stateObj['id'];
    }
  };

  private gettourByCategory = () => {
    let url = API.URL.FOOTER.DETAIL;
    url = url.replace('{tourCategoryId}', this.categoryID.toString());
    let response = {};
    this.subscriptionStateDetail = this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {

    }, () => {

    });
  };
}
