import { Currency } from './currency';
import { Status } from './status';
import { Campaign } from './campaign';
/**
 * voucher info
 */
export interface IVoucherInfo {
  VoucherId: number;
  DiscountPrice: number;
  Currency: Currency;
}
export class VoucherInfo implements IVoucherInfo {
  VoucherId: number;
  DiscountPrice: number;
  Currency: Currency;
}
/**
 * voucher
 */
export interface IVoucher {
  VoucherId: number;
  CampaignId: number;
  MemberId: number;
  DiscountPrice: number;
  DiscountPercent: number;
  VoucherCode: string;
  VoucherInfo: string;
  ExpiredDate: Date;
  Currency: Currency;
  Status: Status;
  Campaign: Campaign;
}
export class Voucher implements IVoucher {
  VoucherId: number;
  CampaignId: number;
  MemberId: number;
  DiscountPrice: number;
  DiscountPercent: number;
  VoucherCode: string;
  VoucherInfo: string;
  ExpiredDate: Date;
  Currency: Currency;
  Status: Status;
  Campaign: Campaign;
}
