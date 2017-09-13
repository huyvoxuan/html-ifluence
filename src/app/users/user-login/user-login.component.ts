import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoginUser, User, FbUser } from './../shared/user.model';
import { AuthService } from './../shared/auth.service';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import * as Alertify from 'alertifyjs';
import { UtilsService } from '../../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { UIRouter } from '@uirouter/angular';
import { CookieService } from 'angular2-cookie/core';

declare const FB: any;
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  public user: LoginUser;
  public userInfo: User;
  public sessionToken: string;
  public errorMessage: string;
  public isLoggedIn: boolean;
  public objectRoute: {name: string, id: number};

  private subscriptionUrlAfterLogin: Subscription;
  private subscriptionForgotPassword: Subscription;
  private subscriptionLogin: Subscription;
  private subscriptionFacebookRegister: Subscription;
  private subscriptionFacebookLogin: Subscription;
  @ViewChild('warningElement') warningElement: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  public facebookAccountInfo: { accessToken?: string, userID?: string, firstName?: string, lastName?: string, email?: string, pictureURL?: string };
  constructor(private authService: AuthService,
    private utilsService: UtilsService,
    private uiRouter: UIRouter,
    private cookie: CookieService) {
    this.user = new LoginUser();
    this.isLoggedIn = false;
    this.facebookAccountInfo = {};

    this.subscriptionUrlAfterLogin = new Subscription();
    this.subscriptionForgotPassword = new Subscription();
    this.subscriptionLogin = new Subscription();
    this.subscriptionFacebookRegister = new Subscription();
    this.subscriptionFacebookLogin = new Subscription();
  }

  ngOnInit() {
    this.facebookInit();
    this.subscriptionUrlAfterLogin = this.utilsService.getLoginURL.subscribe( (res: any) => {
      this.objectRoute = res;
    });
  }
  ngOnDestroy() {
    this.subscriptionUrlAfterLogin.unsubscribe();
    this.subscriptionForgotPassword.unsubscribe();
    this.subscriptionLogin.unsubscribe();
    this.subscriptionFacebookRegister.unsubscribe();
    this.subscriptionFacebookLogin.unsubscribe();
  }
  /**
   * submit login
   * call service
  **/
  login() {
    const body = {
      UserName: this.user.UserName,
      Password: this.user.Password
    };
    this.subscriptionLogin = this.authService.login(body).subscribe((res: any) => {
      if (res && res.Success) {
        Alertify.success('Đăng nhập thành công');
        this.userInfo = res.Data.MemberInfo;
        this.sessionToken = res.Data.SessionTokenId;

        this.closeModal.nativeElement.click();
        this.cookie.put(Utils.config.cookieKey.token, this.sessionToken);
        this.cookie.put(Utils.config.cookieKey.userInfo, JSON.stringify(this.userInfo));
        this.utilsService.setLoginStatus(true);
        this.user = new LoginUser();
        if (this.objectRoute && this.objectRoute.name) {
          this.uiRouter.stateService.go(this.objectRoute.name, {id: this.objectRoute.id});
        }
      } else if (res.Message) {
        this.errorMessage = res.Message;
        Alertify.error(this.errorMessage);
        Utils.warningMessage(this.errorMessage, this.warningElement.nativeElement);
      }
    }, error => {
      this.errorMessage =  <any>error;
      Alertify.error(this.errorMessage);
      Utils.warningMessage(this.errorMessage, this.warningElement.nativeElement);
    });
  }
  /**
   * forgot password
   * @param:
   * click event, call service
  **/
  forgotPassword() {
    if (this.user.UserName) {
      const userName = { UserName: this.user.UserName };
      this.subscriptionForgotPassword = this.authService.forgotPass(userName).subscribe( (res: any) => {
        if (res && res.Success) {
          Alertify.success(res.Message);
        } else {
          Alertify.error(res.Message);
        }
      }, error => {
        this.errorMessage = <any> error;
        Alertify.error(this.errorMessage);
      })
    }
    else {
      Alertify.error('Vui lòng nhập username');
    }
  }
  /**
   * initialize facebook sdk
  **/
  facebookInit() {
    FB.init({
      appId: API.FACEBOOK.APPID,
      cookie: API.FACEBOOK.COOKIE,
      xfbml: API.FACEBOOK.XFBML,
      version: API.FACEBOOK.VERSION
    });
  }
  /**
   * login site with facebook account
  **/
  facebookLogin() {
    FB.getLoginStatus( (response: any) => {
      if (response.status === 'connected') {
        this.requestMe();
      } else {
        this.requestLogin();
      }
    });
  }
  requestLogin() {
    FB.login( (response: any) => {
      if (response.authResponse) {
        this.facebookAccountInfo.accessToken = response.authResponse.accessToken;
        this.requestMe();
      } else {
        Alertify.error(Utils.unAuthorized);
      }
    }, { scope: 'user_friends' });
  }
  requestMe() {
    FB.api('/me',
      { fields: 'name, first_name, picture, email, last_name' },
      (response: any) => {
        if (response) {
          this.facebookAccountInfo.userID = response.id;
          this.facebookAccountInfo.firstName = response.first_name;
          this.facebookAccountInfo.lastName = response.last_name;
          this.facebookAccountInfo.email = response.email;
          this.facebookAccountInfo.pictureURL = response.picture && response.picture.data ? response.picture.data.url : '';
          this.checkFacebookAccount();
        }
      }
    );
  }
  /**
   * check facebook account is registered or not
   */
  checkFacebookAccount() {
    const body = {
      FbUserId: this.facebookAccountInfo.userID
    }
    this.subscriptionFacebookLogin = this.authService.facebookLogin(body).subscribe( (res: any) => {
      if (res && res.Success === false) {
        this.facebookAuth();
      } else if (res && res.Success) {
        this.saveCookieToken(res.Data.SessionTokenId, JSON.stringify(res.Data.MemberInfo));
      }
    }, error => {
      this.errorMessage = <any> error;
      Alertify.error(this.errorMessage);
    })
  }
  /**
   * register
   */
  facebookAuth() {
    const body = {
      FbUserId: this.facebookAccountInfo.userID,
      FbAccessToken: this.facebookAccountInfo.accessToken,
      FirstName: this.facebookAccountInfo.firstName,
      LastName: this.facebookAccountInfo.lastName,
      UserName: this.facebookAccountInfo.userID,
      Email: this.facebookAccountInfo.email,
      PhotoUrl: this.facebookAccountInfo.pictureURL,
      Password: new Date().getTime()
    };
    if (this.facebookAccountInfo.userID && this.facebookAccountInfo.accessToken) {
      this.subscriptionFacebookRegister = this.authService.facebookRegister(body).subscribe( (res: any) => {
        if (res && res.Success && res.Data) {
          this.saveCookieToken(res.Data.SessionTokenId, JSON.stringify(res.Data.MemberInfo));
        } else {
          this.errorMessage = res.Message;
          Alertify.error(this.errorMessage);
        }
      }, error => {
        this.errorMessage = <any> error ;
        Alertify.error(this.errorMessage);
      })
    } else {
      Alertify.error(Utils.unAuthorized);
      FB.logout( (response: any) => {
      });
    }
  }
  /*
   * save cookie token
   */
  saveCookieToken(token: string, info: string) {
    this.cookie.put(Utils.config.cookieKey.token, token);
    this.cookie.put(Utils.config.cookieKey.userInfo, info);
    window.location.reload();
  }
}
