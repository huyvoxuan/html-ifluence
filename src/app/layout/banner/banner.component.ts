import { Component, OnInit, Input, OnDestroy, Host } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  private subscriptionBannerConf: Subscription;
  public bannerConf: {
    bannerImg?: string,
    isSlogan?: boolean,
    isSearch?: boolean
  };
  private subscriptionCompanyDetail: Subscription;
  public phoneNumber = '';
  constructor(private utilsService: UtilsService,
    private baseService: BaseService,
    private appComp: AppComponent) {
    this.bannerConf = {
      bannerImg: Utils.config.bannerImage.home,
      isSlogan: false,
      isSearch: false
    };
    this.subscriptionBannerConf = new Subscription();
    this.subscriptionCompanyDetail = new Subscription();
  }

  ngOnInit() {
    this.subscriptionBannerConf = this.utilsService.getBannerConfig.subscribe( (value: any) => {
      this.bannerConf.bannerImg = value.bannerImg ? value.bannerImg : Utils.config.bannerImage.home;
      this.bannerConf.isSlogan = value.isSlogan ? value.isSlogan : false;
      this.bannerConf.isSearch = value.isSearch ? value.isSearch : false;
    })
    this.getContactDetail();
  }
  ngOnDestroy() {
    this.subscriptionBannerConf.unsubscribe();
    this.subscriptionCompanyDetail.unsubscribe();
  }
  /**
   * return detail of company
   * call api
   */
  private getContactDetail = () => {
    const url = API.URL.COMPANY.CONTACT;
    let response = {};
    this.subscriptionCompanyDetail = this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
    }, () => {
      if (response['Success']) {
        this.phoneNumber = response['Data']['Phone'];
      }
    })
  }
  /* change language
  */
  public changeLanguage = (value: string) => {
    this.appComp.changeLanguage(value);
  }
}
