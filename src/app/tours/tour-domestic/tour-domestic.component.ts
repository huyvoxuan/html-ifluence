import { Component, OnInit, AfterViewInit } from '@angular/core';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-tour-domestic',
  templateUrl: './tour-domestic.component.html',
  styleUrls: ['./tour-domestic.component.css']
})
export class TourDomesticComponent implements OnInit, AfterViewInit {
  public domesticAPIParams: string;
  public pageSize = Utils.config.pageSize.default;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub1, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.domesticAPIParams = `${API.URL.TOURS.FILTER}?IsDomestic=true`;
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
