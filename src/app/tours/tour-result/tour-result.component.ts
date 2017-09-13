import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { API } from '../../shared/api';
import { Utils } from '../../shared/utils';
import { TourService } from './../shared/tour.service';
import { UtilsService } from '../../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-tour-result',
  templateUrl: './tour-result.component.html',
  styleUrls: ['./tour-result.component.css']
})
export class TourResultComponent implements OnInit, OnDestroy {

  public searchURL: string;
  public isSearch: boolean;
  private subscriptionSearchParams: Subscription;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private tourService: TourService, private utilsService: UtilsService) {
    this.searchURL = sessionStorage.getItem('searchURL');
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.subscriptionSearchParams = this.utilsService.getSearchTours.subscribe( (res: any) => {
      this.searchURL = res.api;
      this.isSearch = res.isSearch;
    }, error => {
    });
  }
  ngOnDestroy() {
    this.subscriptionSearchParams.unsubscribe();
  }
}
