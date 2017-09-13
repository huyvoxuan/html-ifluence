import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { Utils } from '../../shared/utils';
import { UtilsService } from '../../shared/utils.service';
import * as Alertify from 'alertifyjs';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { UIRouter } from '@uirouter/angular';
@Component({
  selector: 'app-user-loggedin',
  templateUrl: './user-loggedin.component.html',
  styleUrls: ['./user-loggedin.component.css']
})
export class UserLoggedinComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  private subscriptionLogout: Subscription;
  public userInfo: {name?: string, email?: string, nameStandfor?: string, avatar?: string };
  constructor(private AuthService: AuthService,
    private utilsService: UtilsService,
    private cookie: CookieService,
    private uiRouter: UIRouter
    ) {
    this.errorMessage = '';
    this.subscriptionLogout = new Subscription();
    this.userInfo = { name: '', email: '', nameStandfor: '', avatar: '' };
    this.utilsService.getUserInfo.subscribe( (res: any) => {
      this.showUserInfo();
    });
  }

  ngOnInit() {
    this.showUserInfo();
  }
  ngOnDestroy() {
    this.subscriptionLogout.unsubscribe();
  }
  /**
   * get some user info and showing on storefront
  **/
  private showUserInfo = () => {
    if (this.cookie.get(Utils.config.cookieKey.token)) {
      const userStr = this.cookie.get(Utils.config.cookieKey.userInfo);
      const userObj = JSON.parse(userStr);

      this.userInfo.avatar = userObj['PhotoUrl'];
      this.userInfo['email'] = userObj['Email'];
      this.userInfo['name'] = `${userObj.FirstName} ${userObj.LastName}`;
      this.userInfo['nameStandfor'] = Utils.standForName(userObj.FirstName, userObj.LastName);
    }
  }

  /**
   * logout function
   * call service
  **/
  public logout = () => {
    this.subscriptionLogout = this.AuthService.logout().subscribe((res: any) => {
      if (res && res.Success) {
        this.cookie.removeAll();
        this.utilsService.setLoginStatus(false);
        Alertify.success(res.Message);
        this.uiRouter.stateService.go('home');
      }
      else {
        Alertify.error(res.Message);
      }
    }, error => {
      this.errorMessage = <any> error;
      Alertify.error(this.errorMessage);
    });
  }
}
