import { Component, OnInit, OnDestroy } from '@angular/core';
import { API } from './../../../shared/api';
import { BaseService } from './../../../shared/base.service';
import { UtilsService } from './../../../shared/utils.service';
import * as Alertify from 'alertifyjs';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from './../../../shared/utils';
@Component({
  selector: 'app-user-tour',
  templateUrl: './user-tour.component.html',
  styleUrls: ['./user-tour.component.css']
})
export class UserTourComponent implements OnInit, OnDestroy {

  private errorMessage: string;
  public tours: Array<any>;
  private subGetCountry = new Subscription();
  public countries = [];
  public tourMembers = [];
  private tourRegisterDetail = {};
  private registerTourAPI: string;
  constructor(private baseService: BaseService,
    private utilsService: UtilsService) {
    this.registerTourAPI = API.URL.TOURS.REGISTERED.FILTER;
    this.errorMessage = '';
    this.tours = [];
    this.utilsService.setMemberPageConf({changePointBtn: false, searchBox: true, childrenContent: 'tour'});
  }

  ngOnInit() {
    this.getTours(this.registerTourAPI);
    this.getCountries();
    this.utilsService.getMemberSearch.subscribe( (res: any) => {
      this.getTours(res);
    });
  }
  ngOnDestroy() {
    this.subGetCountry.unsubscribe();
  }
  /**
   * get tours registered
   */
  private getTours = (url: string): void => {
    let response = {};
    this.baseService.getData(url).subscribe ( (res: any) => {
      if (res && res.Success) {
        response = res;
      }
    }, (error: any) => {
      this.errorMessage = <any> error;
      this.utilsService.showOverlay(false);
    }, () => {
      if ('Data' in response) {
        this.tours = response['Data']['Items'];
      }
      this.utilsService.showOverlay(false);
    })
  };
  /**
   * get all countries
   */
  private getCountries = () => {
    this.subGetCountry = this.baseService.getData(API.URL.COUNTRY.GETALL).subscribe( (res: any) => {
      if (res && res.Success) {
        this.countries = res.Data.Items;
      }
    }, (error: any) => {
    }, () => {

    })
  };
  /**
   * get tour registered detail
   */
  private getTourRegisterDetail = (tourRegisterID: number) => {
    let url = API.URL.TOURS.REGISTERED.DETAIL;
    let response = {};
    url = url.replace('{TourRegistrationId}', tourRegisterID.toString());
    this.baseService.getData(url).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {

    }, () => {
      if (response['Success']) {
        this.tourRegisterDetail = response['Data'];
        this.tourMembers = response['Data']['TourRegistrationMembers'];
      }
    });
  };
  /**
   * Event binding
   */
  public editTourMember(tourRegisterID: number) {
    this.getTourRegisterDetail(tourRegisterID);
  }
  public cancelTour(tourResID: number) {
    let response = {};
    let url = API.URL.TOURS.REGISTERED.CANCEL;
    url = url.replace('{TourRegistrationId}', tourResID.toString());
    this.utilsService.showOverlay(true);
    this.baseService.postData(url, '').subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
      Alertify.error(error);
      this.utilsService.showOverlay(false);
    }, () => {
      this.utilsService.showOverlay(false);
      if (response['Success']) {
        this.getTours(this.registerTourAPI);
        Alertify.success('Hủy tour thành công');
      } else {
        Alertify.error('Error');
      }
    });
  }
  public updateTourMember() {
    this.utilsService.showOverlay(true);
    const url = API.URL.TOURS.REGISTERED.UPDATE;
    const body = {
      TourDepartureScheduleId: this.tourRegisterDetail['TourDepartureScheduleId'],
      TourRegistrationMembers: this.tourMembers
    };
    this.baseService.postData(url,body).subscribe( (res: any) => {
    }, (error: any) => {
      this.utilsService.showOverlay(false);
    }, () => {
      this.utilsService.showOverlay(false);
    });
  }
  public formatDate = (date: Date): string => {
    return Utils.formatDateToString(date);
  }
}
