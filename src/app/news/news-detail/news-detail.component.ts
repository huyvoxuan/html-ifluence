import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Utils } from '../../shared/utils';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { API } from '../../shared/api';
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from '../../shared/base.service';
import { UtilsService } from '../../shared/utils.service';
import { News } from '../shared/news';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  public newsID: number;
  private subscriptionNewsDetail = new Subscription();
  public news: News;
  constructor(private uiGlobals: UIRouterGlobals,
    private baseService: BaseService,
    private utilsService: UtilsService) {
    this.news = new News();
    this.newsID = this.uiGlobals.params.id;
  }

  ngOnInit() {
    this.getNewsDetail(this.newsID);
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  ngOnDestroy() {
    this.subscriptionNewsDetail.unsubscribe();
  }
  private getNewsDetail = (newsID: number) => {
    const url = API.URL.NEWS.DETAIL.replace('{newsId}', newsID.toString());
    let response = {};
    this.utilsService.showOverlay(true);
    this.subscriptionNewsDetail = this.baseService.getData(url).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      response = res;
    }, (error: any) => {
      this.utilsService.showOverlay(false);
    }, () => {
      if (response['Success']) {
        this.news = response['Data'];
      }
    });
  }

  public formatDate = (date: Date) => {
    if (date) {
      return Utils.formatDateToString(date, 'dd/mm/yyyy');
    } else {
      return '';
    }
  }
  public back() {
    history.back();
  }
}
