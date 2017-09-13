import { Component, OnInit, OnDestroy } from '@angular/core';
import { Utils } from '../../shared/utils';
import { UtilsService } from '../../shared/utils.service';
import { API } from '../../shared/api';
import { BaseService } from '../../shared/base.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  private bannerConf: { bannerImg?: string, isSlogan?: boolean, isSearch?: boolean };
  public isViewSearch = false;
  public isViewChangePoint = false;
  public searchText = '';
  public childrenContent = '';
  public suggestList = [];
  private subscriptionSuggestList = new Subscription();
  public searchVourcherText = '';
  constructor(private utilsService: UtilsService, private baseService: BaseService) {
    this.utilsService.getMemberPageConfig.subscribe( (value: any) => {
      if ( Object.keys(value).length) {
        this.isViewSearch = value.searchBox;
        this.isViewChangePoint = value.changePointBtn;
        this.childrenContent = value.childrenContent;
      }
    });
  }

  ngOnInit() {
    this.bannerConf = { bannerImg: Utils.config.bannerImage.user, isSearch: true };
    this.utilsService.setBannerConfig(this.bannerConf);
  }
  ngOnDestroy() {
     this.subscriptionSuggestList.unsubscribe();
  }
  public changeSearchTourValue = (value: string) => {
    this.subscriptionSuggestList.unsubscribe();
    if (value) {
      this.getSearchType();
    } else {
      this.suggestList = [];
    }
  }
  private getSearchType = () => {
    if(this.childrenContent === 'voucher') {
      this.searchVouchers();
    } else if ( this.childrenContent === 'tour') {
      this.searchTours();
    }
  }

  private searchTours = () => {
    const url = `${API.URL.TOURS.REGISTERED.AUTOCOMPLETE}${this.searchText}`;
    this.subscriptionSuggestList = this.baseService.getData(url).subscribe( (res: any) => {
      if (res && res['Success']) {
        this.suggestList = res['Data']['Items'];
      }
    });
  }

  private selectedItem = (value: string) => {
    this.searchText = value;
    this.suggestList = []
  }

  private searchVouchers = () => {
    // need api of search vouchers ...
  }

  public submitSearch = () => {
    const url = `${API.URL.TOURS.REGISTERED.FILTER}?Name=${this.searchText}`;
    this.utilsService.setMemberSearch(url);
  }

  public changeSearchVoucherValue = () => {
    this.utilsService.setFilterVoucher(this.searchVourcherText);
  }
}
