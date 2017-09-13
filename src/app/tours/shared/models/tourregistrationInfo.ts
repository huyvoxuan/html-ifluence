import { TourRegistrationMemberInfo } from './tourregistrationmemberinfo';
import { PaymentTransactionRequest } from '../../../shared/models/paymenttransactionrequest';
export interface ITourRegistrationInfo {
  TourDepartureScheduleId: number;
  BankId: number;
  AdultCount: number;
  ChildrenCount: number;
  InfantCount: number;
  PromotionCode: string;
  PaymentTypeId: number;
  AdditionalRequest: string;
  PayAddress: string;
  Amount: number;
  TourRegistrationMembers: TourRegistrationMemberInfo[];
  PaymentTransactionRequest: PaymentTransactionRequest;
}

export class TourRegistrationInfo implements ITourRegistrationInfo {
  TourDepartureScheduleId: number;
  BankId: number;
  AdultCount: number;
  ChildrenCount: number;
  InfantCount: number;
  PromotionCode: string;
  PaymentTypeId: number;
  AdditionalRequest: string;
  PayAddress: string;
  Amount: number;
  TourRegistrationMembers: TourRegistrationMemberInfo[];
  PaymentTransactionRequest: PaymentTransactionRequest;
}
