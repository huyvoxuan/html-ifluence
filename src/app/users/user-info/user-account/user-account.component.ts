import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BaseService } from './../../../shared/base.service';
import { API } from './../../../shared/api';
import { UtilsService } from './../../../shared/utils.service';
import { Utils } from './../../../shared/utils';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import * as Alertify from 'alertifyjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UIRouter } from '@uirouter/angular';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  private errorMessage: string;
  private subscriptionUserDetail: Subscription;
  private subscriptionUserUpdate: Subscription;
  private userDetailResponseData: {};
  private userUpdateResponseData: {};
  private userID: number;
  public user: { Email?: string, FirstName?: string, LastName?: string, UserName?: string, Address?: string, PhotoUrl?: string };
  public avatarObj: { file?: File, src?: string };
  public passwordObj: { oldPassword?: string, newPassword?: string, confirmPassword?: string };
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(private baseService: BaseService,
    private cookie: CookieService,
    private domSanitizer: DomSanitizer,
    private utilsService: UtilsService,
    private uiRouter: UIRouter) {
    this.subscriptionUserDetail = new Subscription();
    this.subscriptionUserUpdate = new Subscription();
    this.userDetailResponseData = {};
    this.userUpdateResponseData = {};
    this.user = {};
    this.userID = 0;
    this.errorMessage = '';
    this.avatarObj = {};
    this.passwordObj = {};
    this.utilsService.setMemberPageConf({changePointBtn: false, searchBox: false});
  }

  ngOnInit() {
    const token = this.cookie.get(Utils.config.cookieKey.token);
    if (token) {
      this.getUserID();
      this.getUserDetail();
    } else {
      this.uiRouter.stateService.go('home');
    }
  }
  ngOnDestroy() {
    this.subscriptionUserDetail.unsubscribe();
    this.subscriptionUserUpdate.unsubscribe();
  }

  private getUserDetail = () => {
    let url = API.URL.USER.DETAIL;
    url = url.replace('{id}', this.userID.toString());
    this.utilsService.showOverlay(true);
    this.subscriptionUserDetail = this.baseService.getData(url).subscribe( (res: any) => {
      if (res && res.Success) {
        this.userDetailResponseData = res;
      }
    }, (error) => {
      this.utilsService.showOverlay(false);
    }, () => {
      this.utilsService.showOverlay(false);
      if ('Data' in this.userDetailResponseData) {
        this.user = this.userDetailResponseData['Data'];
      }
    })
  }
  private getUserID = () => {
    const userStr = this.cookie.get(Utils.config.cookieKey.userInfo);
    const userObj = JSON.parse(userStr);
    this.userID = userObj.MemberId;
  }
  /**
   * trigger to input type file click
   */
  public chooseFile = () => {
    this.inputFile.nativeElement.click();
  }
  /**
   * change avatar photo
   **/
  public fileChangeEvent = (fileInput: any) => {
    const files = fileInput.srcElement.files;
    const fileObj = { file: files[0], src : URL.createObjectURL(files[0]) };
    this.avatarObj = fileObj;
  }
  private userUpdate = () => {
    const url = API.URL.USER.UPDATE;
    const formData = new FormData();
    if (this.avatarObj.file) {
      formData.append(this.avatarObj.file.name, this.avatarObj.file);
    }
    const body = {
      Email: this.user.Email,
      FirstName: this.user.FirstName,
      LastName: this.user.LastName,
      UserName: this.user.UserName,
      Address: this.user.Address
    };
    formData.append('model', new Blob([JSON.stringify(body)], { type: 'application/json' }));
    this.utilsService.showOverlay(true);
    this.subscriptionUserUpdate = this.baseService.postDataFormDataType(url, formData).subscribe( (res: any) => {
      if (res) {
        this.userUpdateResponseData = res;
      }
    }, (error: any) => {
      this.utilsService.showOverlay(false);
    }, () => {
      this.utilsService.showOverlay(false);
      if ( !this.userUpdateResponseData['Success'] && 'Message' in this.userUpdateResponseData) {
        Alertify.error(this.userUpdateResponseData['Message']);
      }
      else if ('Data' in this.userUpdateResponseData) {
        const info = this.userUpdateResponseData['Data'];
        this.cookie.put(Utils.config.cookieKey.userInfo, JSON.stringify(info));
        this.utilsService.setUserInfo(info);
        Alertify.success(this.userUpdateResponseData['Message']);
      }
    });
  }
  private passUpdate = () => {
    const url = API.URL.USER.CHANGEPASS;
    const body = {
      OldPassword: this.passwordObj.oldPassword,
      Password: this.passwordObj.newPassword
    };
    let response = {};
    this.baseService.updateData(url, body).subscribe ( (res: any) => {
      if (res) {
        response = res;
      }
    }, (error: any) => {

    }, () => {
      if (!response['Success']) {
        this.errorMessage = response['Message'];
        Alertify.error(this.errorMessage);
      } else {
        Alertify.success('Đổi password thành công');
        this.passwordObj = { oldPassword: '', newPassword: '', confirmPassword: ''};
        this.closeModal.nativeElement.click();
      }
    });
  }
  private validUserForm = (): boolean => {
    let isValid = true;
    if (isValid && !this.user.LastName) {
      this.errorMessage = 'Vui lòng nhập họ';
      isValid = false;
    }
    if (isValid && !this.user.FirstName) {
      this.errorMessage = 'Vui lòng nhập tên';
      isValid = false;
    }
    if (isValid && this.user.Email && !Utils.validateEmail(this.user.Email)) {
      this.errorMessage = 'Email không đúng định dạng';
      isValid = false;
    }
    return isValid;
  }
  private validPasswordForm = (): boolean => {
    let isValid = true;
    if (isValid && !this.passwordObj.oldPassword) {
      this.errorMessage = 'Vui lòng nhập mật khẩu cũ';
      isValid = false;
    }
    if (isValid && !this.passwordObj.newPassword) {
      this.errorMessage = 'Vui lòng nhập mật khẩu mới';
      isValid = false;
    }
    if (isValid && !this.passwordObj.confirmPassword) {
      this.errorMessage = 'Vui lòng nhập mật khẩu xác nhận';
      isValid = false;
    }
    if (isValid && this.passwordObj.newPassword !== this.passwordObj.confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không đúng';
      isValid = false;
    }
    return isValid;
  }
  /**
   * binding event to html
   **/
  public updateUserInfo = () => {
    if (this.validUserForm()) {
      this.userUpdate();
    } else {
      Alertify.error(this.errorMessage);
    }
  }
  public updatePassword = () => {
    if (this.validPasswordForm()) {
      this.passUpdate();
    } else {
      Alertify.error(this.errorMessage);
    }
  }
}
