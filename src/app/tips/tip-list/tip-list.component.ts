import { Component, OnInit, Input } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { Tip } from '../shared/tip';
import { TipService } from '../shared/tip.service';
import { UtilsService } from '../../shared/utils.service';
import { Utils } from '../../shared/utils';
@Component({
  selector: 'app-tip-list',
  templateUrl: './tip-list.component.html',
  styleUrls: ['./tip-list.component.css']
})
export class TipListComponent implements OnInit {
  public currentState: string;
  public tipTypeID: number;
  public tips: Tip[];
  public data: Object;
  public pageCount: number;
  @Input() pageSize: number;
  constructor(private uiRouter: UIRouter, private tipService: TipService,
    private utilsService: UtilsService) {
    this.currentState = this.uiRouter.globals.$current.name;
    this.tipTypeID = 0;
    this.data = new Object();
  }

  ngOnInit() {
    this.getPageSize();
    this.getTipType(this.currentState);
    this.getTipList(this.tipTypeID);
  }
  getPageSize() {
    if (!this.pageSize) {
      this.pageSize = 4;
    }
  }
  /**
   * return current state to map api for type of tips
   */
  getTipType(state: string) {
    switch (state) {
      case 'tips.shopping':
        this.tipTypeID = 1;
        break;
      case 'tips.visa':
        this.tipTypeID = 2;
        break;
      case 'tips.train':
        this.tipTypeID = 3;
        break;
      case 'tips.river':
        this.tipTypeID = 4;
        break;
      case 'tips.food':
        this.tipTypeID = 5;
        break;
      case 'tips.thing':
        this.tipTypeID = 6;
        break;
      case 'tips.place':
        this.tipTypeID = 7;
        break;
      case 'tips.all':
        this.tipTypeID = 8;
        break;
      default:
        this.tipTypeID = 1;
        break;
    }
  }
  /**
   * get tip list
   */
  getTipList(tipTypeID: number, pageIndex?: number) {
    this.utilsService.showOverlay(true);
    this.tipService.getTipsByTipType(tipTypeID, this.pageSize, pageIndex).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res && res.Success === true) {
        this.data = res.Data;
        }
      }, error => {
      }, () => {
        if (this.data) {
          this.tips = this.data['Items'];
          this.pageCount = this.data['PageCount'];
        }
      })
  }
  getItems(index: number) {
    this.getTipList(this.tipTypeID, index);
  }
  loadMore() {
    if (this.pageCount > 1) {
      this.pageSize += Utils.config.pageSize.default;
      this.getTipList(this.tipTypeID);
    }
  }
}

  /*viewMore(items?: number): void {
    if (!this.rerender) {
      this.showingItems = items ? items : this.showingItems;
      this.changeDetectorRef.detectChanges();
      this.rerender = true;
    }
  }*/
