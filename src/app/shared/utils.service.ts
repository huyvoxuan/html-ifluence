import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilsService {
  private isShowOverlay = new Subject<boolean>();
  private login = new Subject<boolean>();
  private objectLogin = new Subject<object>();

  private hidden = new Subject<boolean>();
  private searchList = new Subject<Object>();
  private searchTours = new Subject<Object>();
  private bannerObj = new Subject<Object>();
  private userInfo = new Subject<Object>();
  private memberPageConf = new Subject<Object>();
  private memberSearch = new Subject<string>();
  private filterVoucher = new Subject<string>();
  private language = new Subject<string>();
  private seoState = new Subject<Object>();
  constructor() { }

  /* get values - use in target components */
  isShow = this.isShowOverlay.asObservable();
  isLoggedIn = this.login.asObservable();
  getLoginURL = this.objectLogin.asObservable();
  isHidden = this.hidden.asObservable();
  getTourListSearch = this.searchList.asObservable();
  getSearchTours = this.searchTours.asObservable();
  getBannerConfig = this.bannerObj.asObservable();
  getUserInfo = this.userInfo.asObservable();
  getMemberPageConfig = this.memberPageConf.asObservable();
  getMemberSearch = this.memberSearch.asObservable();
  getFilterVoucher = this.filterVoucher.asObservable();
  getLanguage = this.language.asObservable();
  getSeoState = this.seoState.asObservable();
  /* end get values */

  /*--- set values - use in begin components ---*/
  /* show/hide overlay when call api*/
  showOverlay(value: boolean) {
    this.isShowOverlay.next(value);
  }
  /* update status of login/logout */
  setLoginStatus(value: boolean) {
  	this.login.next(value);
  }
  /* url after userlogin */
  setLoginURL(value: object) {
    this.objectLogin.next(value);
  }
  /* set hidden event status */
  setHiddenItem(value: boolean) {
    this.hidden.next(value);
  }
  /* set find result to search list */
  setTourListSearch(value: Object) {
    this.searchList.next(value);
  }
  setBannerConfig(value: Object) {
    this.bannerObj.next(value);
  }
  setSearchTours(value: Object) {
    this.searchTours.next(value);
  }
  setUserInfo(value: Object) {
    this.userInfo.next(value);
  }
  setMemberPageConf(value: Object) {
    this.memberPageConf.next(value);
  }
  setMemberSearch(value: string) {
    this.memberSearch.next(value);
  }
  setFilterVoucher(value: string) {
    this.filterVoucher.next(value);
  }
  setLanguage(value: string) {
    this.language.next(value);
  }
  setSeoState(value: Object) {
    this.seoState.next(value);
  }
}
