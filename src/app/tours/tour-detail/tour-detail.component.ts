import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { Tour } from './../shared/models/tour';
import { Currency } from '../../shared/models/currency';
import { TourSurcharge } from './../shared/models/toursurcharge';
import { DepartureSchedule } from './../shared/models/departureschedule';
import { Departure } from './../shared/models/departure';
import { TourItineraryInfo } from './../shared/models/TourItineraryInfo';
import { TourService } from './../shared/tour.service';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
import { CookieService } from 'angular2-cookie/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  public tourScheduleID: number;
  public tour: Tour;
  public errorMessage: string;
  public departureDateStr: string;
  public attractionID: number;
  public apiParams: string;
  public isFixedSlider: boolean;
  @ViewChild('fixedSlider') fixedSlider: ElementRef;
  @ViewChild('container') container: ElementRef;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  private subscriptionTour = new Subscription();
  constructor(private uiRouter: UIRouter,
    private uiGlobals: UIRouterGlobals,
    private tourService: TourService,
    private utilsService: UtilsService,
    private cookie: CookieService
    ) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.tourScheduleID = this.uiGlobals.params.id;
    this.tour = new Tour();
    this.tour.Currency = new Currency();
    this.tour.TourSurcharge = new TourSurcharge();
    this.tour.DepartureSchedule = [];
    this.tour.Departure = new Departure();
    this.tour.TourItineraryInfo = [];
    this.attractionID = 0;
    this.apiParams = '';
    this.isFixedSlider = true;
  }

  ngOnInit() {
    this.getTourDetail(this.tourScheduleID);
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  ngOnDestroy() {
    this.subscriptionTour.unsubscribe();
  }
  /**
   * get tour schedule detail
   * @param id {number} - id of schedue tour
   * call service
   * api path - tours/{TourDepartureScheduleId}
   **/
  getTourDetail(id: number) {
    this.utilsService.showOverlay(true);
    this.subscriptionTour = this.tourService.getTourByID(id).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res.Success && res.Data) {
        this.tour = res.Data;
        this.apiParams = `${API.URL.TOURS.FILTER}?PageSize=4&StateCode=${this.tour.Departure.StateCode}`;
        if (this.tour.DepartureDate) {
          const date = new Date(this.tour.DepartureDate)
          this.departureDateStr = Utils.formatDateToString(date);
        }
      } else {
        this.errorMessage = res.Message ? res.Message : ''
      }
    }, error => {
      this.utilsService.showOverlay(false);
      this.errorMessage = <any> error;
    }, () => {

    });
  }
  /**
   * redirect to booking page
   */
  gotoBooking(id: number) {
    if (!this.cookie.get(Utils.config.cookieKey.token)) {
      const route = { name: 'booking', id: id };
      this.utilsService.setLoginURL(route);
      this.utilsService.setLoginStatus(false);
      setTimeout ( () => {
        document.getElementById('login').click();
      }, 1000 );
    } else {
      this.uiRouter.stateService.go('booking', {id: id});
    }
  }
  /**
   * resize
   */
   @HostListener('window:resize', ['$event']) onScrollEvent() {
    const clientWidth = document.body.clientWidth;
    if (clientWidth < 768) {
      this.isFixedSlider = false;
    } else {
      this.isFixedSlider = true;
    }
    if (this.isFixedSlider && clientWidth > 785 && clientWidth < 1280) {
      const leftElement = document.getElementById('leftElement');
      const leftWidth = leftElement.clientWidth;
      const position = leftElement.offsetLeft + leftElement.clientWidth;
      const fixedElm = document.getElementById('fixedElement');
      if (fixedElm) {
        fixedElm.style.left = `${position + 60}px`;
      }
    }
  }
}
