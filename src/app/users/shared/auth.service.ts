import { Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http, Response } from '@angular/http';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private headers: Headers;
  private options: RequestOptions;
  private headerObj: {};
  constructor(private baseService: BaseService, private http: Http) {
    this.headerObj = API.HEADER.DEFAULT;
    this.headers = new Headers(this.headerObj);
  }
  /**
   * login site with usernam and password
   * @param userLogin {Object}
  **/
  login (userLogin: {}) {
    const url = `${API.URL.USER.LOGIN}`;
    return this.baseService.postData(url, userLogin);
  }
  /**
   * check login status of user
   * @param
  **/
  checkCredentials(): boolean {
    if (sessionStorage.getItem('sessionToken') === null) {
      return false;
    }
    return true;
  }
  /**
   * log out
   * @param
  **/
  logout() {
    const url = `${API.URL.USER.LOGOUT}`;
    return this.baseService.postData(url, '');
  }
  /**
   * register
   * @param body {Object}
  **/
  register(body: {}) {
    const url = `${API.URL.USER.REGISTER.MANUAL}`;
    const formData: FormData = new FormData();
    formData.append('model', new Blob([JSON.stringify(body)], { type: 'application/json' }));
    return this.baseService.postDataFormDataType(url, formData);
  }
  /**
   * forgot password
   * @param userName {Object}
  **/
  forgotPass(userName: Object) {
    const url = API.URL.USER.FORGOTPASS;
    return this.baseService.postData(url, userName);
  }
  /**
   * facebook register
   * @param body {Object}
  **/
  facebookRegister(body: {}) {
    const url = API.URL.USER.REGISTER.FACEBOOK;
    const formData: FormData = new FormData();
    formData.append('model', new Blob([JSON.stringify(body)], { type: 'application/json' }));
    return this.baseService.postDataFormDataType(url, formData);
  }
  /**
   * facebook register
   * @param body {Object}
  **/
  facebookLogin(body: Object) {
    const url = API.URL.USER.LOGINFB;
    return this.baseService.postData(url, body);
  }
}
