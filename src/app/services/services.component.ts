import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']

})
export class ServicesComponent implements OnInit, AfterViewInit {
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
