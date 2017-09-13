import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { User } from './../shared/user.model';
import { Utils } from '../../shared/utils';
import { UtilsService } from '../../shared/utils.service';
import * as Alertify from 'alertifyjs';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { Subscription } from 'rxjs';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit, OnDestroy {

  public user: User;
  public sessionToken: string;
  public errorMessage: string;
  public passwordConfirm: string;
  @ViewChild('closeModal') closeModal: ElementRef;
  private subscriptionRegister: Subscription;
  constructor(private authService: AuthService,
    private utilsService: UtilsService,
    private uiRouter: UIRouter,
    private cookie: CookieService) {
    this.user = new User();
    this.passwordConfirm = '';
    this.subscriptionRegister = new Subscription();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscriptionRegister.unsubscribe();
  }
  /**
   * account register
   */
  register() {
    const body = {
      LastName: this.user.LastName,
      FirstName: this.user.FirstName,
      UserName: this.user.UserName,
      Password: this.user.Password,
      Email: this.user.Email
    };
    if (this.passwordConfirm !== this.user.Password) {
      Alertify.error('Password not match');
      return;
    }
    let response = {};
    this.subscriptionRegister = this.authService.register(body).subscribe((res: any) => {
      response = res;
    }, (error: any) => {
      this.errorMessage = <any> error;
      Alertify.error(this.errorMessage);
    }, () => {
      if (response['Success']) {
        this.registerSuccess(response['Data']['MemberInfo'], response['Data']['SessionTokenId']);
      } else {
        this.errorMessage = response['Message'];
        const errorObj = JSON.parse(response['Message']);
        for (var key in errorObj) {
          if (errorObj.hasOwnProperty(key) && errorObj[key]) {
            this.errorMessage = errorObj[key];
            break;
          }
        }
        Alertify.error(this.errorMessage);
      }
    });
  }
  /**
   * update session when register successfully
   */
  registerSuccess(memberInfo: Object, sessionTokenId: string) {
    this.cookie.put(Utils.config.cookieKey.token, sessionTokenId);
    this.cookie.put(Utils.config.cookieKey.userInfo, JSON.stringify(memberInfo));
    window.location.reload();
  }
}


