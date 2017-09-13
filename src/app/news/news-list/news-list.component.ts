import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { API } from '../../shared/api';
import { Utils } from '../../shared/utils';
import { BaseService } from '../../shared/base.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  @Input() isloadMore: boolean;
  @Input() pageSize: number;
  public newsList = [];
  public paramsAPI: string;
  public pageCount: number;
  constructor(private baseService: BaseService) {
    this.paramsAPI = API.URL.NEWS.FILTER;
  }

  ngOnInit() {
    if (!this.pageSize) {
      this.pageSize = Utils.config.pageSize.default;
    }
    const url = `${this.paramsAPI}?PageSize=${this.pageSize}`;
    this.getNews(url);
  }
  ngOnDestroy() {

  }
  /*
   * get news list
   */
  private getNews = (url: string) => {
    let response = {};
    this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {

    }, () => {
      if (response['Success']) {
        this.newsList = response['Data']['Items'];
        this.pageCount = response['Data']['PageCount'];
      }
    });
  }
}
