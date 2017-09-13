import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { API } from '../../shared/api';
import { Utils } from '../../shared/utils';
import { TourResultComponent } from './../tour-result/tour-result.component';
import { UtilsService } from '../../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { TourService } from './../shared/tour.service';
@Component({
  selector: 'app-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css'],
  providers: [TourResultComponent]
})
export class TourSearchComponent implements OnInit, OnDestroy {

  public errorMessage: string;
  public price: number;
  public departDate: Date;
  public stateCode: string;
  public countryCode: string;
  public arrivalStateCode: string;
  public arrivalCountryCode: string;

  public startPlace = {
    StateCode: '',
    Country: {
      Code: ''
    }
  };

  public endPlace = {
    StateCode: '',
    Country: {
      Code: ''
    }
  };
  private searchURL: string;
  public pageSize = Utils.config.pageSize.default;
  public rangeDate: { startDate?: string, endDate?: string};
  public rangeSelected: Object;
  constructor(private uiRouter: UIRouter, private utilsService: UtilsService, private tourService: TourService) {
    this.price = 0;
    this.departDate = null;
    this.stateCode = '';
    this.countryCode = '';
    this.arrivalStateCode = '';
    this.arrivalCountryCode = '';
    this.searchURL = API.URL.TOURS.FILTER;
    this.rangeDate = { startDate: '', endDate: ''};
    this.rangeSelected = new Object();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  /*
   * return url to search tours and redirect to search result page
  */
  findTours() {
    this.getSearchParams();
    this.uiRouter.stateService.go('tourSearch');
    this.utilsService.setSearchTours({isSearch: true, api: this.searchURL});
  }
  /**
   * return url for search
   */
  private getSearchParams = () => {
    let priceTours = '';
    if (this.price) {
      const priceObj = this.priceRange(this.price);
      priceTours = `PriceFrom=${priceObj['min']}&PriceTo=${priceObj['max']}`;
    }
    this.stateCode = ( this.startPlace && this.startPlace.StateCode ) ? this.startPlace.StateCode : '';
    this.countryCode = ( this.startPlace && this.startPlace.Country ) ? this.startPlace.Country.Code : '';
    this.arrivalStateCode = ( this.endPlace && this.endPlace.StateCode ) ? this.endPlace.StateCode : '';
    this.arrivalCountryCode = ( this.endPlace && this.endPlace.Country ) ? this.endPlace.Country.Code : '';

    const dateFrom = (this.rangeDate.startDate) ? `DateFrom=${this.rangeDate.startDate}` : `DateFrom=`;
    const dateTo = (this.rangeDate.endDate) ? `DateTo=${this.rangeDate.endDate}` : `DateTo=`;
    const startPlace = `StateCode=${this.stateCode}&CountryCode=${this.countryCode}`;
    const arrivalPlace = `ArrivalStateCode=${this.arrivalStateCode}&ArrivalCountryCode=${this.arrivalCountryCode}`;
    const params = `${startPlace}&${arrivalPlace}&${dateFrom}&${dateTo}&${priceTours}`;
    this.searchURL = `${API.URL.TOURS.FILTER}?${params}`;
    sessionStorage.setItem('searchURL', this.searchURL);
  }
  getRangeDate() {
    this.rangeDate.startDate = this.rangeSelected['startDate'] ? Utils.formatDateToString(this.rangeSelected['startDate'], 'mm/dd/yyyy') : '';
    this.rangeDate.endDate = this.rangeSelected['endDate'] ? Utils.formatDateToString(this.rangeSelected['endDate'], 'mm/dd/yyyy') : '';
  }
  public getPriceValue = (value: any) => {
    while (value.indexOf(',') > -1) {
      value = value.replace(',', '');
    }
    this.price = value;
  };
  private priceRange = (price: number): Object => {
    let range = {};
    if (typeof price !== 'number') {
      price = parseInt(price);
    }
    if (price) {
      range['min'] = price - ( price * 40 / 100 );
      range['max'] = price + ( price * 40 / 100 );
    }
    return range;
  };
}
