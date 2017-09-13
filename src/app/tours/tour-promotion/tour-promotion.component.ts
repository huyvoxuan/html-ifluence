import { Component, OnInit, AfterViewInit } from '@angular/core';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-tour-promotion',
  templateUrl: './tour-promotion.component.html',
  styleUrls: ['./tour-promotion.component.css']
})
export class TourPromotionComponent implements OnInit, AfterViewInit {

  public tourAPI: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  public pageSize = Utils.config.pageSize.default;
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.tourAPI = `${API.URL.TOURS.FILTER}?IsHotDeal=1`;
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
