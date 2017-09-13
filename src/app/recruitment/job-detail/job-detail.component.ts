import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Utils } from '../../shared/utils';
import { BaseService } from '../../shared/base.service';
import { UtilsService } from '../../shared/utils.service';
import { UIRouterGlobals} from '@uirouter/angular';
import { API } from '../../shared/api';
import { Subscription } from 'rxjs/Subscription';
import { Recruitment } from '../shared/models/recruitment';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  private subscriptionJobDetail = new Subscription();
  public jobDetail: Recruitment;
  constructor(private utilsService: UtilsService,
    private baseService: BaseService,
    private uiGlobals: UIRouterGlobals) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.jobDetail = new Recruitment();
  }

  ngOnInit() {
    this.getJobDetail();
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  ngOnDestroy() {
    this.subscriptionJobDetail.unsubscribe();
  }
  private getJobDetail = () => {
    const jobID = this.uiGlobals.params.id;
    let url = API.URL.RECRUITMENT.DETAIL;
    let response = {};
    url = url.replace('{id}', jobID);
    this.subscriptionJobDetail = this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
    }, () => {
      if (response['Success']) {
        this.jobDetail = response['Data'];
      }
    })
  };
}
