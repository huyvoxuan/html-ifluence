import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { EventOfTour } from '../shared/models/event';
import { EventService } from '../shared/event.service';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, AfterViewInit {
  public eventID: number;
  public event: EventOfTour;
  public errorMessage: string;
  public eventCreatedAt: string;
  public apiParams: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  @ViewChild('targetScroll') targetScroll: ElementRef;
  constructor(private uiGlobals: UIRouterGlobals,
    private eventService: EventService,
    private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.errorMessage = '';
    this.eventID = this.uiGlobals.params.id;
    this.event = new EventOfTour();
    this.eventCreatedAt = '';
    this.apiParams = `${API.URL.TOURS.FILTER}?PageSize=4&IsHotDeal=1`;
  }

  ngOnInit() {
    this.getEventDetail(this.eventID);
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  /**
   * get event detail
   * @param id {number} - id of event
   * call service
   * api path - events/{eventId}
   **/
  getEventDetail(id: number) {
    this.utilsService.showOverlay(true);
    this.eventService.getEventByID(id).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res.Success && res.Data) {
        this.event = res.Data;
        this.formatDate();
      } else {
        this.errorMessage = res.Message ? res.Message : '';
      }
    }, error => {
      this.errorMessage = <any> error;
      this.utilsService.showOverlay(false);
    });
  }
  formatDate() {
    const dateStr = Utils.formatDateToString(this.event.CreatedAt);
    this.eventCreatedAt = dateStr;
  }
  back() {
    history.back();
  }
  /**
   * fixed slider when scroll
   */
  @HostListener('window:resize', ['$event']) onScrollEvent() {
  }
}
