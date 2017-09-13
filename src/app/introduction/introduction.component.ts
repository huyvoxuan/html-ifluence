import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit, AfterViewInit {
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
}
