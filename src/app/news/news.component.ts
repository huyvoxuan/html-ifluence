import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, AfterViewInit {
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.home, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
