import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Tour } from './../shared/models/tour';
import { TourService } from './../shared/tour.service';
import { UtilsService } from '../../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '../../shared/utils';
import { UIRouter } from '@uirouter/angular';
@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit, OnChanges, OnDestroy {

  public tourList: Tour[];
  public tourCount: number;
  public errorMessage: string;
  public currentPage: number;
  private rerender: boolean;

  private subscriptionTourList: Subscription;
  public tourData: Object;
  public pagingArray: Array<any>;
  public pageCount: number;
  public pageActive: number;
  @Input() apiParams: string;
  @Input() listType?: string;
  @Input() listTitle: string;
  @Input() isViewMore: boolean;
  @Input() isViewCountTotal: boolean;
  @Input() isViewMoreBottom: boolean;
  @Input() isHome: boolean;
  @Input() isSearch: boolean;
  @Input() isPaging: boolean;
  @Input() pageSize: number;
  constructor(private tourService: TourService,
    private changeDetectorRef: ChangeDetectorRef,
    private utilsService: UtilsService,
    private uiRouter: UIRouter) {
    this.tourCount = 0;
    this.rerender = false;
    this.currentPage = 1;
    this.subscriptionTourList = new Subscription();
    this.tourData = new Object();
    this.pageActive = 1;
  }
  ngOnInit() {
    const url = this.setAPIParams(this.pageSize);
    this.getTours(url);
  }
  ngOnChanges() {
    if (this.isSearch) {
      this.getTours(this.apiParams);
    }
  }
  ngOnDestroy() {
    this.subscriptionTourList.unsubscribe();
  }
  getTours(api: string) {
    this.utilsService.showOverlay(true);
    this.subscriptionTourList = this.tourService.getTours(api).subscribe((res: any) => {
      this.utilsService.showOverlay(false);
      if (res && res.Success === true) {

        this.tourData = res.Data;

        this.tourList= res.Data.Items;
        this.tourCount = res.Data.TotalCount;
      }
    }, error => {
      this.utilsService.showOverlay(false);
      this.errorMessage = <any>error;
    }, () => {
      this.pageCount = this.tourData['PageCount'];
      this.pageActive = this.tourData['PageNumber'];
    });
  }
  listPage(variable): void {
    switch (variable) {
      case 'promotion':
        this.uiRouter.stateService.go('promotionTours');
        break;
      case 'aboard':
        this.uiRouter.stateService.go('aboardTours');
        break;
      case 'domestic':
        this.uiRouter.stateService.go('domesticTours');
        break;
      default:
        break;
    }
  }
  getItems(index: number) {
    if (index !== this.pageActive) {
      const api = `${this.apiParams}&PageNumber=${index}`;
      this.getTours(api);
    }
  }
  loadMore() {
    if (this.pageCount > 1) {
      this.pageSize += Utils.config.pageSize.tour.listPage;
      const url = this.setAPIParams(this.pageSize);
      this.getTours(url);
    }
  }
  setAPIParams(size?: number) {
    let url = '';
    if (size) {
      const pageSize = `PageSize=${size}`;
      url = `${this.apiParams}&${pageSize}`;
    } else {
      url = this.apiParams;
    }
    return url;
  }
}
