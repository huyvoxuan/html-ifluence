import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { Utils } from '../../shared/utils';
import { API } from '../../shared/api';
import { Tip } from '../shared/tip';
import { TipService } from '../shared/tip.service';
import { UtilsService } from '../../shared/utils.service';
@Component({
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.component.html',
  styleUrls: ['./tip-detail.component.css']
})
export class TipDetailComponent implements OnInit {
  public tipID: number;
  public tip: Tip;
  public errorMessage: string;
  public apiParams: string;
  public createdAt: string;
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  @ViewChild('targetScroll') targetScroll: ElementRef;
  constructor(private uiRouterGlobals: UIRouterGlobals,
    private tipService: TipService,
    private utilsService: UtilsService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.tipID = this.uiRouterGlobals.params.id;
    this.errorMessage = '';
    this.tip = new Tip();
    this.apiParams = `${API.URL.TOURS.FILTER}?PageSize=4&IsHotDeal=1`;
    this.createdAt = '';
  }

  ngOnInit() {
    this.getTipDetail(this.tipID);
  }
  /**
   * get event detail
   * @param id {number} - id of event
   * call service
   * api path - events/{eventId}
   **/
  getTipDetail(id: number) {
    this.utilsService.showOverlay(true);
    this.tipService.getTipDetail(id).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res.Success && res.Data) {
        this.tip = res.Data;
        this.formatDate();
        Utils.scrollElement(this.targetScroll.nativeElement);
      } else {
        this.errorMessage = res.Message ? res.Message : '';
      }
    }, error => {
      this.errorMessage = <any> error;
    });
  }

  formatDate() {
    const dateStr = Utils.formatDateToString(this.tip.CreatedAt);
    this.createdAt = dateStr;
  }
}
