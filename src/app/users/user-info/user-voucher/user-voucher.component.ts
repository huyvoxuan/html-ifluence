import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { API } from './../../../shared/api';
import { BaseService } from './../../../shared/base.service';
import * as Alertify from 'alertifyjs';
import { UtilsService } from './../../../shared/utils.service';
import { Utils } from './../../../shared/utils';
import { Voucher } from './../../../shared/models/voucher';
@Component({
  selector: 'app-user-voucher',
  templateUrl: './user-voucher.component.html',
  styleUrls: ['./user-voucher.component.css']
})
export class UserVoucherComponent implements OnInit {
  private errorMessage: string;
  public vouchers: Array<Voucher>;
  public voucherCampaigns = [];
  @ViewChild('btnClose') btnClose: ElementRef;
  public searchText = '';
  constructor(private baseService: BaseService, private utilsService: UtilsService) {
    this.errorMessage = '';
    this.vouchers = [];
    this.utilsService.setMemberPageConf({changePointBtn: true, searchBox: true, childrenContent: 'voucher'});
  }

  ngOnInit() {
    this.getUserVouchers();
    this.getVoucherCampaigns();
    this.utilsService.getFilterVoucher.subscribe( (res: any) => {
      this.searchText = res;
    });
  }
  private getUserVouchers = () => {
    const url = API.URL.VOUCHERS.FILTER;
    let response = {};
    this.utilsService.showOverlay(true);
    this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
      this.utilsService.showOverlay(false);
    }, (error: any) => {
      this.errorMessage = error;
      this.utilsService.showOverlay(false);
    }, () => {
      if (response['Success']) {
        this.vouchers = response['Data']['Items'];
      }
    });
  }
  private getVoucherCampaigns = () => {
    const url = API.URL.VOUCHERS.CAMPAIGN;
    let response = {};
    this.utilsService.showOverlay(true);
    this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
      this.utilsService.showOverlay(false);
    }, () => {
      this.utilsService.showOverlay(false);
      if (response['Success']) {
        this.voucherCampaigns = response['Data']['Items'];
      }
    })
  }
  public changePoint = (campaignID: number) => {
    let response = {};
    let url = API.URL.VOUCHERS.CHANGEPOINT;
    url = url.replace('{campaignId}', campaignID.toString());
    this.utilsService.showOverlay(true);
    this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
      this.utilsService.showOverlay(false);
      Alertify.error('Error');
    }, () => {
      this.utilsService.showOverlay(false);
      this.btnClose.nativeElement.click();
      if (response['Success']) {
        Alertify.success('Đổi điểm thành công');
        this.getUserVouchers();
      } else {
        Alertify.error(response['Message']);
      }
    });
  }
  public voucherDate = (date: Date): string => {
    return Utils.formatDateToString(date);
  }
  public isExpired = (date: Date): boolean => {
    const currentTime = new Date().getTime();
    const camPaignTime = new Date(date).getTime();
    if (camPaignTime < currentTime) {
      return true;
    } else {
      return false;
    }
  }

}
