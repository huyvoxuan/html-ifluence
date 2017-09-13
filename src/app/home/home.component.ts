import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { API } from './../shared/api';
import { Utils } from './../shared/utils';
import { UtilsService } from './../shared/utils.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public promtionAPIParams: string;
  public domesticAPIParams: string;
  public aboardAPIParams: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  private pageSize: number;
  @ViewChild('elemmentTopHomePage') targetScroll: ElementRef;
  constructor(private utilsService: UtilsService) {
    this.pageSize = Utils.config.pageSize.tour.homePage;
    this.promtionAPIParams = `${API.URL.TOURS.FILTER}?IsHotDeal=1&PageSize=${this.pageSize}`;
    this.domesticAPIParams = `${API.URL.TOURS.FILTER}?IsDomestic=true&PageSize=${this.pageSize}`;
    this.aboardAPIParams = `${API.URL.TOURS.FILTER}?IsDomestic=false&PageSize=${this.pageSize}`;
    this.bannerConf = { isSlogan: true, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
