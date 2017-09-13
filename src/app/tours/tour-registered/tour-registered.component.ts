import { Component, OnInit } from '@angular/core';
import { API } from '../../shared/api';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-tour-registered',
  templateUrl: './tour-registered.component.html',
  styleUrls: ['./tour-registered.component.css']
})
export class TourRegisteredComponent implements OnInit {

  public tourAPI: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  public pageSize = Utils.config.pageSize.default;
  constructor(private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.tourAPI = `${API.URL.TOURS.REGISTERED}?PageSize=${this.pageSize}`;
  }

}
