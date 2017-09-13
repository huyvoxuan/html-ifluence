import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
import { BaseService } from './../shared/base.service';
import { API } from './../shared/api';
import { Subscription } from 'rxjs/Subscription';
import * as Alertify from 'alertifyjs';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy, AfterViewInit {
  public errorMessage: string;
  public contact: {
    Address?: {
      SuburbName?: string
    },
    Phone?: string,
    Email?: string,
    Website?: string
  };
  public markers: Array<any>;
  public branches: Array<any>;
  private subscriptionContactDetail: Subscription;
  private subscriptionBranchList: Subscription;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  public markerTarget: { index?: number, position?: any };
  public request: { name?: string, phone?: string, company?: string, email?: string, skype?: string, message?: string };
  @ViewChild('popup') mapPopup: ElementRef;
  constructor(private utilsService: UtilsService, private baseService: BaseService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.errorMessage = '';
    this.markers = [];
    this.branches = [];
    this.contact = {};
    this.markerTarget = { index: -1 };
    this.request = { name: '', phone: '', skype: '', company: '', email: '', message: '' };
  }

  ngOnInit() {
    this.getContactDetail();
    this.getBranches();
  }
  ngOnDestroy() {
    this.subscriptionBranchList.unsubscribe();
    this.subscriptionContactDetail.unsubscribe();
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  /**
   * return detail of company
   * call api
   */
  getContactDetail() {
    const url = API.URL.COMPANY.CONTACT;
    this.subscriptionContactDetail = this.baseService.getData(url).subscribe( (res: any) => {
      if (res && res.Data) {
        this.contact = res.Data;
      }
    }, error => {
      this.errorMessage = <any> error;
    })
  }
  /**
   * return address of all branches of the company
   * call api
   */
  getBranches() {
    const url = API.URL.COMPANY.BRANCHES;
    this.subscriptionBranchList = this.baseService.getData(url).subscribe( (res: any) => {
      if (res && res.Data) {
        this.branches = res.Data.Items;
      }
    }, error => {
      this.errorMessage = <any> error;
    }, () => {
      this.pushMaker();
    })
  }
  pushMaker() {
    for (let i = 0, len = this.branches.length; i < len; i++) {
      const branch = this.branches[i];
      const maker = { title: branch.Name, lat: branch.Geog.Lat, lng: branch.Geog.Lng };
      this.markers.push(maker);
    }
  }
  showMarkerPopup() {

    if (this.markerTarget.index > -1) {
      const left = this.markerTarget.position.x + 20;
      const top = this.markerTarget.position.y - 40;
      const popupElement = this.mapPopup.nativeElement;

      popupElement.style.left = `${left}px`;
      popupElement.style.top = `${top}px`;
      popupElement.classList.remove('hidden');
      popupElement.querySelector('[data-address]').innerHTML = this.branches[this.markerTarget.index].Address;
      popupElement.querySelector('[data-phone]').innerHTML = this.branches[this.markerTarget.index].PhoneNumber;
      popupElement.querySelector('[data-fax]').innerHTML = this.branches[this.markerTarget.index].Fax;
      popupElement.querySelector('[data-email]').innerHTML = this.branches[this.markerTarget.index].Email;
    }
    else {
      this.mapPopup.nativeElement.classList.add('hidden');
    }
  }
  sendRequest() {
    if (this.validRequestForm()) {
      // return Alertify.success('Update API to send request');
      const url = API.URL.EMAIL.FEEDBACK;
      const body = {
        Name: this.request.name,
        Phone: this.request.phone,
        Email: this.request.email,
        Skype: this.request.skype,
        Message: this.request.message
      };
      this.utilsService.showOverlay(true);
      this.baseService.postData(url, body).subscribe( (res: any) => {
        this.utilsService.showOverlay(false);
        if (res && res['Success']) {
          Alertify.success(res['Message']);
          this.resetForm();
        } else {
          Alertify.error(res['Message']);
        }
      }, (error: any) => {
        this.errorMessage = <any> error;
        Alertify.error(this.errorMessage);
      })
    } else {
      Alertify.error(this.errorMessage);
    }
  }
  validRequestForm(): boolean {
    let isValid = true;
    if (!this.request.name) {
      this.errorMessage = 'Nhập họ tên';
      isValid = false;
      return isValid;
    }
    if (!this.request.email) {
      this.errorMessage = 'Nhập email';
      isValid = false;
      return isValid;
    }
    if (!Utils.validateEmail(this.request.email)) {
      this.errorMessage = 'Email không hợp lệ';
      isValid = false;
      return isValid;
    }
    if (!this.request.message) {
      this.errorMessage = 'Nhập nội dung';
      isValid = false;
      return isValid;
    }
    return isValid;
  }
  private resetForm = () => {
    this.request = { name: '', phone: '', skype: '', company: '', email: '', message: '' };
  };
}
