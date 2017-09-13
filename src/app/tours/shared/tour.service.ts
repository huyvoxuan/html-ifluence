import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';
@Injectable()
export class TourService {

  public tourDepartureScheduleID = 0;
  constructor(private baseService: BaseService) {
  }
  get() {
    return this.tourDepartureScheduleID;
  }
  /**
   * get all schedule tours
   * @param url {string}
  **/
  getTours(url: string) {
    // let url = `${API.URL.TOURS.FILTER}`;
    return this.baseService.getData(url);
  }
  /**
   * get tour detail
   * @param id {number}
  **/
  getTourByID(id: number) {
    const url = `${API.URL.TOURS.DEFAULT}/${id}`;
    // const url = `${API.URL.TOURS.TOURDETAILLOGGEDIN}/${id}`;
    return this.baseService.getData(url);
  }
  /**
   * return attraction detail
   * @param id {number}
  **/
  getAttractionByID(id: number) {
    const url = `${API.URL.ATTRACTIONS.DEFAULT}/${id}`;
    return this.baseService.getData(url);
  }
}
