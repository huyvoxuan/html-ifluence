import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API } from '../../shared/api';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class EventService {
  private handleErrorPromise (error: Response | any) {
    return Promise.reject(error.message || error);
  }
  constructor(private http: Http, private baseService: BaseService) {
  }
  /**
   * service return all event by promise
   * @param null
  **/
  getEvents(): Promise<any[]> {
    return this.http
      .get(API.URL.EVENTS.FILTER).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleErrorPromise);
  }
  /**
   * service return all event by observable
   * @param null
  **/
  getAllEvents(url: string) {
    //const url = API.URL.EVENTS.FILTER;
    return this.baseService.getData(url);
  }
  /**
   * service return event detail
   * @param id {number} - id of event
  **/
  getEventByID(id: number) {
    const url = `${API.URL.EVENTS.DEFAULT}/${id}`;
    return this.baseService.getData(url);
  }
}
