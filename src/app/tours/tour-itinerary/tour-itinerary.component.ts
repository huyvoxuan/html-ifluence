import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TourService } from './../shared/tour.service';
import { Attraction } from './../shared/models/attraction';
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from '../../shared/base.service';
import { API } from '../../shared/api';
@Component({
  selector: 'app-tour-itinerary',
  templateUrl: './tour-itinerary.component.html',
  styleUrls: ['./tour-itinerary.component.css']
})
export class TourItineraryComponent implements OnInit, OnDestroy {
  public attractionID: number;
  public attraction: Attraction;
  public errorMessage: string;
  public temperature: number;
  public makers: Array<any>;
  private subscriptionAttraction: Subscription;
  private subscriptionTemperature: Subscription;
  constructor(private tourService: TourService, private baseService: BaseService) {
    this.attractionID = 0;
    this.attraction = new Attraction();
    this.errorMessage = '';
    this.temperature = 0;
    this.makers = [];
    this.subscriptionAttraction = new Subscription();
    this.subscriptionTemperature = new Subscription();
  }

  ngOnInit() {
    // this.getTemperature();
  }
  ngOnDestroy() {
    this.subscriptionAttraction.unsubscribe();
    this.subscriptionTemperature.unsubscribe();
  }
  public show(attractionID: number): void {
    this.getAttractionDetail(attractionID);
  }
  /**
   * get attraction detail
   * @param attractionID {number}
   */
  getAttractionDetail(attractionID: number) {
    this.subscriptionAttraction = this.tourService.getAttractionByID(attractionID).subscribe( (res: any) => {
      if (res && res.Data) {
        this.attraction = res.Data;
      }
    }, error => {
      this.errorMessage = <any> error;
    }, () => {
      this.getTemperature(this.attraction.Geog.Lat, this.attraction.Geog.Lng);
      this.getMakerObj(this.attraction.Geog.Lat, this.attraction.Geog.Lng, this.attraction.Name);
    })
  }
  /**
   * get attraction temperature
   * @param attractionID {number}
   */
  getTemperature (lat: number, lng: number) {
    const url = `${API.URL.TEMPERATURE.GET}&lat=${lat}&lon=${lng}`;
    const isNoHeader = true;
    this.subscriptionTemperature = this.baseService.postData(url, {}, isNoHeader).subscribe( (res: any) => {
      if (res && res.main) {
        this.temperature = Math.round(res.main.temp - 273.15);
      }
    }, error => {
      this.errorMessage = <any> error;
    })
  }
  /**
   * get maker of attration to show it's location in map
   */
  getMakerObj(lat: number, lng: number, title?: string) {
    const maker = {lat: lat, lng: lng, title: title};
    this.makers = [];
    this.makers.push(maker);
  }
}
