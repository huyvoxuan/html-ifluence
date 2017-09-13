import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';

@Injectable()
export class VoucherService {

  constructor(private baseService: BaseService) { }
  /**
   * check voucher valid
   * @param promotionCode {string}
  **/
  voucherValidate(promotionCode: string) {
    const url = `${API.URL.VOUCHERS.VALIDATE}${promotionCode}`;
    return this.baseService.postData(url, '');
  }
}
