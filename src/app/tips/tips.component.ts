import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TipService } from './shared/tip.service';
import { TipType } from './shared/tip';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit, AfterViewInit {
  public tipTypes: TipType[];
  public errorMessage: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  constructor(private tipService: TipService, private utilsService: UtilsService) {
    this.errorMessage = '';
    this.bannerConf = { bannerImg: Utils.config.bannerImage.home, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }

  ngOnInit() {
    this.getTipTypes();
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  /**
   * get kind of tips
   **/
  getTipTypes() {
    this.tipService.getTipTypes().subscribe( (res: any) => {
      if (res && res.Success) {
        this.tipTypes = res.Data ? res.Data.Items : [];
      } else {
        this.errorMessage = res.Message ?  res.Message : '';
      }
    }, error => {
      this.errorMessage = <any> error;
    })
  }
}
