import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { UtilsService } from './../shared/utils.service';
import { Utils } from './../shared/utils';
import { BaseService } from './../shared/base.service';
import { API } from './../shared/api';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit, AfterViewInit, OnDestroy {
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  private subscriptionJobs = new Subscription();
  public jobs: Object[];
  constructor(private utilsService: UtilsService,
    private baseService: BaseService) {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.sub2, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
    this.jobs = [];
  }

  ngOnInit() {
    this.getJobs();
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  ngOnDestroy() {
    this.subscriptionJobs.unsubscribe();
  }
  private getJobs = () => {
    const url = API.URL.RECRUITMENT.FILTER;
    let response = {};
    this.subscriptionJobs = this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {

    }, () => {
      if (response && response['Success']) {
        this.jobs = response['Data']['Items'];
      }
    })
  };
}
