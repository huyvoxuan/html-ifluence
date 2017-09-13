import { Injectable } from '@angular/core';
import { Http, Response, Request, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { API } from './api';
import { Utils } from './utils';
import { UtilsService } from './utils.service';
import { CookieService } from 'angular2-cookie/core';
@Injectable()
export class BaseService {

  private headers: Headers;
  private options: RequestOptions;
  private headerObj: {};
  private token: string;

  constructor(private http: Http, private utilsService: UtilsService, private cookie: CookieService) {
    this.headerObj = API.HEADER.DEFAULT;
    this.token = this.cookie.get(Utils.config.cookieKey.token);
    if (this.token && this.token.length) {
      this.headerObj[API.HEADER.KEY.AUTH] = `${API.HEADER.KEY.AUTHPREFIX}${this.token}`;
    }
    this.headers = new Headers(this.headerObj);
    this.options = new RequestOptions({ headers: this.headers });
    this.utilsService.isLoggedIn.subscribe( (value: boolean) => {
      if (!value) {
        this.headers.delete(API.HEADER.KEY.AUTH);
      } else {
        const token = this.cookie.get(Utils.config.cookieKey.token);
        this.headers.append(API.HEADER.KEY.AUTH, `${API.HEADER.KEY.AUTHPREFIX}${token}`);
      }
      this.options.merge({ headers: this.headers });
    });

    this.utilsService.getUserInfo.subscribe( (res) => {
      this.headers.delete('Content-Type');
      this.headers.delete('content-type');
      this.headers.append('Content-Type', API.HEADER.DEFAULT['Content-Type']);
      this.options.merge({ headers: this.headers });
      //this.reinitHeader();
    });
    /**/
    this.utilsService.getLanguage.subscribe( (res) => {
      this.changeCultureHeader(res);
    });
  }
  private reinitHeader = () => {
    if (this.headers.get('content-type')) {
      this.headers.delete('content-type');
    }
    if (this.headers.get('Content-Type') !== API.HEADER.DEFAULT['Content-Type']) {
      this.headers.append('Content-Type', API.HEADER.DEFAULT['Content-Type']);
    }
    this.options.merge({ headers: this.headers });
  };

  /**
   * change value of CultureId in header request when change language in website
  */
  private changeCultureHeader = (value?: string) => {
    this.headers.set('CultureId', value);
    this.options.merge({ headers: this.headers });
  };

  /**
   *handle error when call api
  */
  private handleError = (error: Response | any) => {
    if(error.status === 401) {
      this.cookie.remove(Utils.config.cookieKey.token);
      this.cookie.remove(Utils.config.cookieKey.userInfo);
      return Observable.throw(Utils.unAuthorized);
    } else if (error.status === 415) {
      this.reinitHeader();
    }
    else {
      return Observable.throw(error.json() || 'Server error');
    }
    // this.utilsService.setLoginStatus(false);
  };

  /**
   * remove default content-type application/json
   * to add content type to multipart
   */
  headerFormData() {
    this.headers.delete('Content-Type');
    this.options = new RequestOptions({ headers: this.headers });
  }
  /**
   * method GET
   * get data from web service with observable
   * @param url: {string}
   */
  getData(url: string): Observable<any[]> {
    return this.http.get(url, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  /**
   * method POST
   * post data to web service with observable
   * use in case body is string/object
   * @param url: {string}
   * @param body: {Object}
   */
  postData(url: string, body: {}, isNoHeader?: boolean): Observable<any[]> {
    const bodyString = JSON.stringify(body);
    this.reinitHeader();
    if (!isNoHeader) {
      return this.http.post(url, bodyString, this.options)
        .map((response: Response) => {
          return response.json();
        }).catch(this.handleError);
    } else {
      return this.http.post(url, bodyString)
        .map((response: Response) => {
          return response.json();
        }).catch(this.handleError);
    }
  }
  /**
   * method POST
   * post data to web service with observable
   * use in case body is FormData
   * @param url: {string}
   * @param body: {FormData}
   */
   postDataFormDataType(url: string, body: FormData) {
    this.headerFormData();
    return this.http.post(url, body, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
  /**
   * method PUT
   * post data to web service with observable
   * @param url: {string}
   * @param body: {Object}
   */
  updateData(url: string, body: {}): Observable<any[]> {
    const bodyString = JSON.stringify(body);
    return this.http.put(url, bodyString, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }
}
