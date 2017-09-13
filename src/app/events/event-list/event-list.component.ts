import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectorRef } from '@angular/core';
import { EventOfTour } from './../shared/models/event';
import { EventService } from './../shared/event.service';
import { UtilsService } from '../../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { API } from '../../shared/api';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  @Input() isloadMore: boolean;
  @Input() isViewTitle: boolean;
  @Input() pageSize: number;/*
  @Input() isPaging: boolean;*/
  public events: EventOfTour[];
  public listCount: number;/*
  public isHiddenItem: boolean;*/

  private subscriptionEventList: Subscription;
  private subscriptionHideItem: Subscription;
  public errorMessage: string;
  public pageCount: number;
  public data: Object;
  public paramsAPI: string;
  constructor(
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef,
    private utilsService: UtilsService
  ) {
    this.listCount = 0;/*
    this.isHiddenItem = false;*/
    this.subscriptionEventList = new Subscription();
    this.subscriptionHideItem = new Subscription();
    this.errorMessage = '';
    this.data = new Object();
    this.paramsAPI = API.URL.EVENTS.FILTER;
  }
  ngOnInit() {
    if (!this.pageSize) {
      this.pageSize = Utils.config.pageSize.event.homePage;
    }
    const url = `${this.paramsAPI}?PageSize=${this.pageSize}`;
    this.getEvents(url);/*
    this.subscriptionHideItem = this.utilsService.isHidden.subscribe( (value: boolean) => {
      this.isHiddenItem = value;
    });*/
  }
  ngOnDestroy() {
    this.subscriptionEventList.unsubscribe();
    this.subscriptionHideItem.unsubscribe();
  }
  getEvents(url: string) {
    this.utilsService.showOverlay(true);
    this.subscriptionEventList = this.eventService.getAllEvents(url).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res && res.Success === true) {
          this.data = res.Data;
        }
      }, error => {
        this.errorMessage = <any> error;
      }, () => {
        if (this.data) {
          this.pageCount = this.data['PageCount'];
          this.events = this.data['Items'];
          this.listCount = this.events.length;
        }
      })
  }
  getItems(currentPage: number) {
    const url = `${this.paramsAPI}&PageNumber=${currentPage}`;
    this.getEvents(url);
  }
  loadMore() {
    if (this.pageCount > 1) {
      this.pageSize += Utils.config.pageSize.default;
      const url = this.setPageSizeParam(this.pageSize);
      this.getEvents(url);
    }
  }
  setPageSizeParam(size: number) {
    let url = '';
    if (size) {
      url = `${this.paramsAPI}?PageSize=${size}`;
    } else {
      url = this.paramsAPI;
    }
    return url;
  }
}
