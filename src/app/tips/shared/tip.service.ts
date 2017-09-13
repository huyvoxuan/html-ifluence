import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';
@Injectable()
export class TipService {

  constructor(private baseService: BaseService) { }
  /**
   * return all tips
   * service return all tips by observable
   * @param null
  **/
  getAllTips() {
    const url = API.URL.TIPS.FILTER;
    return this.baseService.getData(url);
  }
  /**
   * return tips belong to tip type input
   * service return some of tips by observable
   * @param tipType {number}
  **/
  getTipsByTipType(tipType: number, pageSize?: number, pageIndex?: number) {
    let url = `${API.URL.TIPS.FILTER}?tiptypeids=${tipType}`;
    if (pageSize) {
      url = `${url}&PageSize=${pageSize}`;
    }
    if (pageIndex) {
      url = `${url}&PageNumber=${pageIndex}`;
    }
    return this.baseService.getData(url);
  }
  /**
   * get detail of a tipe
   * service return event detail
   * @param id {number} - id of tip
  **/
  getTipDetail(id: number) {
    const url = `${API.URL.TIPS.DEFAULT}/${id}`;
    return this.baseService.getData(url);
  }
  /**
   * get all kind of tips
   * service return tip type list
  **/
  getTipTypes() {
    const url = `${API.URL.TIPS.TIPTYPE}`;
    return this.baseService.getData(url);
  }
}
