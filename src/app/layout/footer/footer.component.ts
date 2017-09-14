import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { UtilsService } from '../../shared/utils.service';
import * as Alertify from 'alertifyjs';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import { Subscription } from 'rxjs/Subscription';
import { UIRouter } from '@uirouter/angular';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  private errorMessage: string;
  public email: string;
  public appLink: { android?: string, ios?: string };
  public states: Object[];
  private subscriptionSendEmail: Subscription;
  private subscriptionStateList: Subscription;
  constructor(private baseService: BaseService,
    private utilsService: UtilsService,
    private uiRouter: UIRouter) {
    this.email = '';
    this.errorMessage = '';
    this.subscriptionSendEmail = new Subscription();
    this.subscriptionStateList = new Subscription();
    this.appLink = {
      android: Utils.config.appLink.android,
      ios: Utils.config.appLink.ios
    };
    this.states = [];
  }

  ngOnInit() {
    this.getStateList();
  }
  ngOnDestroy() {
    this.subscriptionSendEmail.unsubscribe();
  }
  /**
   * send email footer
   */
  public sendEmail = () => {
    if (!this.email) {
      this.errorMessage = 'Nhập email';
      Alertify.error(this.errorMessage);
      return;
    }
    if (Utils.validateEmail(this.email)) {
      /* send email*/
      const body = { 'Email': this.email };
      const url = API.URL.EMAIL.SUBSCRIBE;
      this.subscriptionSendEmail = this.baseService.postData(url, body).subscribe( (res: any) => {
        if (res && res['Success']) {
          Alertify.success(res['Message']);
        } else {
          Alertify.error(res['Message']);
        }
      }, (error: any) => {
        Alertify.error(error);
      })
    } else {
      this.errorMessage = 'Email không hợp lệ';
      Alertify.error(this.errorMessage);
      return;
    }
  }
  /**
   * get dynamic footer item
   */
  private getStateList = () => {
    const url = API.URL.FOOTER.LIST;
    let response = {};
    this.subscriptionStateList =  this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {

    }, () => {
      if (response['Success']) {
        this.states = response['Data']['Items'];
        this.spliceArray();
      }
    })
  };
  private spliceArray = () => {
    let parentArr = [];
    while (this.states.length) {
      let childArr = this.states.splice(0, 10);
      parentArr.push(childArr);
    }
    this.states = parentArr;
  };
  private setSearchParam = (state: Object) => {
    let stateCode = 'ArrivalStateCode=';
    let countryCode = 'ArrivalCountryCode=';
    if (state['StateCode']) {
      stateCode = `${stateCode}${state['StateCode']}`;
    }
    if (state['CountryCode']) {
      countryCode = `${countryCode}${state['CountryCode']}`;
    }

    const url = `${API.URL.TOURS.FILTER}?${stateCode}&${countryCode}`;
    const categoryID = state['TourCategoryId'];
    const stateObj = {
      link : url,
      id: categoryID
    };
    this.utilsService.setSeoState(stateObj);
    sessionStorage.setItem(Utils.config.sessionKey.stateFooter, JSON.stringify(stateObj));
  };

  public setSeoInfo = (state: Object) => {
    this.setSearchParam(state);
    this.uiRouter.stateService.go('footerTours', {id: state['LinkSeo']});
  };
}
