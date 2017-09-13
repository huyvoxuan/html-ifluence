import { Component, OnInit, AfterViewInit } from '@angular/core';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-tour-aboard',
  templateUrl: './tour-aboard.component.html',
  styleUrls: ['./tour-aboard.component.css']
})
export class TourAboardComponent implements OnInit, AfterViewInit {
  public aboardAPIParams: string;
  public pageSize = Utils.config.pageSize.default;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.aboardAPIParams = `${API.URL.TOURS.FILTER}?IsDomestic=false`;
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
