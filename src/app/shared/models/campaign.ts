import { Currency } from './currency';
export interface ICampaign {
  CampaignId: number;
  CampaignTypeId: number;
  Name: string;
  CampaignTypeName: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Point: number;
  MinTourPricePaid: number;
  NumberEffectiveDate: number;
  DiscountPrice: number;
  DiscountPercent: number;
  Currency: Currency;
}
export class Campaign implements ICampaign {
  CampaignId: number;
  CampaignTypeId: number;
  Name: string;
  CampaignTypeName: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Point: number;
  MinTourPricePaid: number;
  NumberEffectiveDate: number;
  DiscountPrice: number;
  DiscountPercent: number;
  Currency: Currency;
}
