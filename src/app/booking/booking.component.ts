import { Component, OnInit, OnChanges, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UIRouter, UIRouterGlobals} from '@uirouter/angular';
import { BaseService } from '../shared/base.service';
import { VoucherService } from './shared/voucher.service';
import { API } from '../shared/api';
import { Utils } from '../shared/utils';
import { Tour } from '../tours/shared/models/tour';
import { Voucher } from '../shared/models/voucher';
import { TourRegistrationMemberInfo } from '../tours/shared/models/tourregistrationmemberinfo';
import { TourRegistrationInfo } from '../tours/shared/models/tourregistrationinfo';
import * as Alertify from 'alertifyjs';
import { UtilsService } from '../shared/utils.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public tour: Tour;
  public voucher: Voucher;
  public id: number;
  public tourDepartureScheduleID: number;

  public memberCount: number;

  public tourPrice: number;
  public promotionCode: string;
  public bankID: number;
  public paymentTypeID: number;
  public additionalRequest: string;
  public payAddress: string;
  public amount: number;

  public errorMessage: string;
  public voucherValue: number;
  public countries = [];
  public discountGroupValue: number;
  public groupPrices = [];
  public discountPeople = [];

  public isFormValid = true;

  public memberRegister: {
    LastName?: string,
    FirstName?: string,
    Age?: number,
    Birthday?: Date,
    Sex?: number,
    CountryId?: number,
    Passport?: string,
    IssueDate?:  Date,
    ExpiryDate?: Date,
    PhoneNumber?: string,
    Email?: string
  };
  public tourRegister: {
    TourDepartureScheduleId?: number,
    BankId?: number,
    AdultCount?: number,
    ChildrenCount?: number,
    InfantCount?: number,
    PromotionCode?: string,
    PaymentTypeId?: number,
    AdditionalRequest?: string,
    PayAddress?: string,
    Amount?: number,
    TourRegistrationMembers?: Object[];
    // PaymentTransactionRequest: PaymentTransactionRequest;
  };

  private subGetTourDetail: Subscription;
  private subGetCountry: Subscription;
  private subCheckVoucher: Subscription;
  private subRegisterTour: Subscription;

  @ViewChild('targetScroll') targetScroll: ElementRef;
  constructor(private uiRouter: UIRouter,
    private voucherService: VoucherService,
    private baseService: BaseService,
    private uiGlobals: UIRouterGlobals,
    private utilsService: UtilsService) {

    this.tour = new Tour();
    this.voucher = new Voucher();
    this.id = this.uiGlobals.params.id;
    this.tourDepartureScheduleID = 0;
    this.memberCount = 1;

    this.tourPrice = 0;
    this.promotionCode = '';
    this.paymentTypeID = 1;
    this.additionalRequest = '';
    this.errorMessage = '';
    this.voucherValue = 0;
    this.discountGroupValue = 0;

    this.subCheckVoucher = new Subscription();
    this.subGetCountry = new Subscription();
    this.subRegisterTour = new Subscription();
    this.subGetTourDetail = new Subscription();

    this.memberRegister = {
      Age: null,
      Birthday: null,
      CountryId: null,
      Email: '',
      ExpiryDate: null,
      FirstName: '',
      IssueDate: null,
      LastName: '',
      Passport: '',
      PhoneNumber: '',
      Sex: null
    };
    this.tourRegister = {
      AdultCount: 1,
      ChildrenCount: 0,
      InfantCount: 0,
      PaymentTypeId: 1,
      TourRegistrationMembers: []
    };
    let memberClone = JSON.parse(JSON.stringify(this.memberRegister));
    this.tourRegister.TourRegistrationMembers[0] = memberClone;
  }

  ngOnInit() {
    this.getTourDetail(this.id);
    this.getCountries();
  }
  ngOnDestroy() {
    this.subGetTourDetail.unsubscribe();
    this.subGetCountry.unsubscribe();
    this.subCheckVoucher.unsubscribe();
    this.subRegisterTour.unsubscribe();
  }
  ngOnChanges() {
  }
  ngAfterViewInit() {
    Utils.scrollToTop();
  }
  /**
   * get tour schedule detail
   * @param id {number} - id of schedule tour
   * call service
   * api path - tours/{TourDepartureScheduleId}
   **/
  getTourDetail(id: number) {
    this.utilsService.showOverlay(true);
    const url = `${API.URL.TOURS.TOURDETAILLOGGEDIN}/${id}`;
    this.subGetTourDetail =  this.baseService.getData(url).subscribe( (res: any) => {
      this.utilsService.showOverlay(false);
      if (res.Success && res.Data) {
        this.tour = res.Data;
        this.groupPrices = res.Data.GroupPrices;
        if (this.groupPrices.length) {
          this.getDiscountPeople();
        }
        this.tourDepartureScheduleID = this.tour.TourDepartureScheduleId;
        if (this.tour.DiscountPrice !== null && this.tour.DiscountPrice > 0) {
          this.tourPrice = this.tour.DiscountPrice;
        } else {
          this.tourPrice = this.tour.Price;
        }
        // first amount
        this.calculate();
      } else {
        this.errorMessage = res.Message ? res.Message : ''
      }
    }, error => {
      this.utilsService.showOverlay(false);
      if (error === Utils.unAuthorized) {
        this.uiRouter.stateService.go('home');
      }
    });
  }
  /**
   * push value of Number People of groupPrices to  group
   */
  getDiscountPeople() {
    for (let i = 0, len = this.groupPrices.length; i < len; i++) {
      this.discountPeople.push(this.groupPrices[i].NumberPeople);
    }
  }
  /**
   * validate voucher
   */
  getVoucherValidate() {
    this.subCheckVoucher =  this.voucherService.voucherValidate(this.tourRegister.PromotionCode).subscribe ( (res: any) => {
      if (res && res.Success) {
        this.voucher = res.Data;
        this.voucherValue = (this.voucher.DiscountPrice !== null && this.voucher.DiscountPrice > 0) ? this.voucher.DiscountPrice : this.voucher.DiscountPercent;
      } else {
        this.voucherValue = 0;
      }
      this.calculate();
    }, error => {
      this.errorMessage = <any> error;
      this.voucherValue = 0;
      this.calculate();
    })
  }
  /**
   * get all countries
   */
  getCountries(){
    this.subGetCountry = this.baseService.getData(API.URL.COUNTRY.GETALL).subscribe( (res: any) => {
      if (res && res.Success) {
        this.countries = res.Data.Items;
      }
    }, error => {
      this.errorMessage = <any> error;
    })
  }
  /**
   * calculate
   */
  calculate() {
    this.getGroupDiscount();
    const totalAdult = this.tourRegister.AdultCount * this.tourPrice;
    const totalChild = (this.tour && this.tour.ChildrenPrice) ? (this.tourRegister.ChildrenCount * this.tour.ChildrenPrice) : 0;
    const totalInfant = (this.tour && this.tour.InfantPrice) ? (this.tourRegister.InfantCount * this.tour.InfantPrice) : 0;
    this.amount = totalAdult + totalChild + totalInfant - this.voucherValue - this.discountGroupValue;
  }
  /**
   * change payment type
   * trigger to radio buttons for payment type
   */
  changePaymentType(input) {
    input.click();
    if (typeof this.tourRegister.PaymentTypeId !== 'number') {
      this.tourRegister.PaymentTypeId = parseInt(this.tourRegister.PaymentTypeId);
    }
    if (this.tourRegister.PaymentTypeId === 3) {
      this.getBank();
    } else if (this.tourRegister.PaymentTypeId === 4) {
      this.getVisa();
    }
  }
  /**
   * return domestic bank list
   * call service
   */
  getBank() {
    const url = API.URL.BANK.DOMESTIC;
    this.baseService.getData(url).subscribe( (res: any) => {
    }, error => {
      this.errorMessage = <any> error;
    });
  }
  /**
   * return credit type
   * call service
   */
  getVisa() {
    const url = API.URL.BANK.VISA;
    this.baseService.getData(url).subscribe( (res: any) => {
    }, error => {
      this.errorMessage = <any> error;
    });
  }
  /**
   * submit register tour
   * @param null
   * call api
   */
  register() {
    this.formValid();
    if (!this.isFormValid) {
      Alertify.error(this.errorMessage);
      return true;
    } else {
      const url = API.URL.TOURS.BOOKING;
      this.registerObject();
      this.utilsService.showOverlay(true);
      this.subRegisterTour = this.baseService.postData(url, this.tourRegister).subscribe( (res: any) => {
        this.utilsService.showOverlay(false);
        if (res && res.Success) {
          if(res.Data && res.Data.PaymentTypeId === 3) {
            const paymentUrl = res.Data.Pay123URL;
            window.location.href = paymentUrl;
          } else {
            Alertify.success('Đăng ký tour thành công');
            this.uiRouter.stateService.go('registeredTours');
          }
        } else {
          this.errorMessage = res.Message;
          Alertify.error(this.errorMessage);
        }
      }, error => {
        this.errorMessage = <any> error;
        this.utilsService.showOverlay(false);
        if (error == Utils.unAuthorized) {
          Alertify.error(Utils.unAuthorized);
          this.uiRouter.stateService.go('home');
        }
      })
    }
  }
  /**
   * get register tour object
   */
  registerObject() {
    this.calculate();

    this.tourRegister.TourDepartureScheduleId = this.tourDepartureScheduleID;
    this.tourRegister.AdditionalRequest = '';
    this.tourRegister.Amount = this.amount;
    this.tourRegister.PayAddress = this.payAddress;
    this.tourRegister.BankId = this.bankID;
  }
  /**
   * validate form register
   */
  formValid() {
    this.isFormValid = true;
    this.errorMessage = '';
    let ageType = {
      type1: 0,
      type2: 0,
      type3: 0
    };
    for (let i = 0, len = this.tourRegister.TourRegistrationMembers.length; i < len; i++) {
      const memberItem = this.tourRegister.TourRegistrationMembers[i];
      this.validAgeType(memberItem, ageType);
      this.validName(memberItem);
      this.validEmail(memberItem);
    }
    if (this.isFormValid && ageType.type1 < 1) {
      this.isFormValid = false;
      this.errorMessage = `Đăng ký tour phải có ít nhất 1 người lớn`;
    }
    if (this.isFormValid && ageType.type1 > this.tourRegister.AdultCount) {
      this.isFormValid = false;
      this.errorMessage = `Số người lớn không phù hợp`;
    }
    if (this.isFormValid && ageType.type2 > this.tourRegister.ChildrenCount) {
      this.isFormValid = false;
      this.errorMessage = `Số trẻ em không phù hợp`;
    }
    if (this.isFormValid && ageType.type3 > this.tourRegister.InfantCount) {
      this.isFormValid = false;
      this.errorMessage = `Số trẻ nhỏ không phù hợp`;
    }
  }
  /**
   *
   */
  validAgeType(member, ageType) {
    if (this.isFormValid) {
      switch (parseInt(member.Age)) {
        case 1:
          ageType.type1++;
          break;
        case 2:
          ageType.type2++;
          break;
        case 3:
          ageType.type3++;
          break;
        default:
          this.isFormValid = false;
          this.errorMessage = `Vui lòng chọn người tham gia`;
          break;
      }
    }
    return ageType;
  }
  /**
   * valid name
   */
  validName(member) {
    if (this.isFormValid) {
      if (member.FirstName === null || member.FirstName === '') {
        this.isFormValid = false;
        this.errorMessage = 'Vui lòng nhập tên người tham gia';
      }
      if (member.LastName === null || member.LastName === '') {
        this.isFormValid = false;
        this.errorMessage = 'Vui lòng nhập họ người tham gia';
      }
    }
  }
  /**
   * valid Email
   */
  validEmail(member) {
    if (this.isFormValid && (member.Email && member.Email.length != '')) {
      const isEmail = Utils.validateEmail(member.Email);
      if (!isEmail) {
        this.isFormValid = false;
        this.errorMessage = 'Email không đúng định dạng';
      }
    }
  }
  /*
   * count all member of tour
  */
  countMembers() {
    this.memberCount = this.tourRegister.AdultCount + this.tourRegister.ChildrenCount + this.tourRegister.InfantCount;
    this.calculate();
    this.removeLastMember();
  }

  removeLastMember() {
    if (this.tourRegister.TourRegistrationMembers.length > this.memberCount && this.tourRegister.TourRegistrationMembers.length !== 1) {
      this.tourRegister.TourRegistrationMembers.pop();
    }
  }
  /**
   * add memebr model
   */
  addMember() {
    if (this.tourRegister.TourRegistrationMembers.length < this.memberCount) {
      let memberClone = JSON.parse(JSON.stringify(this.memberRegister));
      this.tourRegister.TourRegistrationMembers.push(memberClone);
    } else {
      Alertify.error(`Số người tham gia không được quá số người đăng ký`);
    }
  }
  /**
   * remove member in tour member array
   */
  removeMember(index: number) {
    if (this.tourRegister.TourRegistrationMembers.length > 1) {
      this.tourRegister.TourRegistrationMembers.splice(index, 1);
    } else {
      Alertify.error(`Đăng ký tour phải có ít nhất 1 người tham gia`);
    }
  }
  /**
   * get group discount
   */
  getGroupDiscount() {
    if (this.groupPrices.length) {
      const target = this.tourRegister.AdultCount;
      const numberPeople = Math.max.apply(null, this.discountPeople.filter( (i) => {
        return target - i >= 0;
      }));
      if (numberPeople !== -Infinity) {
        for (let i = 0, len = this.groupPrices.length; i < len; i++) {
          const group = this.groupPrices[i];
          if (group.NumberPeople === numberPeople) {
            this.discountGroupValue = group.Price;
          }
        }
      }
    }
  }
}
