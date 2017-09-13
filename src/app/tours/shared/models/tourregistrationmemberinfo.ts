import { TourRegistrationSurcharge } from './tourregistrationsurcharge';
export interface ITourRegistrationMemberInfo {
  TourRegistrationMemberId: number;
  TourRegistrationId: number;
  Age: number; // (1: Adult, 2: Children, 3:Infant)
  LastName: string;
  FirstName: string;
  Birthday: Date;
  Sex: number;
  CountryId: number;
  Passport: string;
  IssueDate: Date;
  ExpiryDate: Date;
  PhoneNumber: string;
  Email: string;
  IsSingleRoom: boolean;
  TourRegistrationSurcharges: TourRegistrationSurcharge[]
}
export class TourRegistrationMemberInfo implements ITourRegistrationMemberInfo {
  TourRegistrationMemberId: number;
  TourRegistrationId: number;
  Age: number; // (1: Adult, 2: Children, 3:Infant)
  LastName: string;
  FirstName: string;
  Birthday: Date;
  Sex: number;
  CountryId: number;
  Passport: string;
  IssueDate: Date;
  ExpiryDate: Date;
  PhoneNumber: string;
  Email: string;
  IsSingleRoom: boolean;
  TourRegistrationSurcharges: TourRegistrationSurcharge[]
}
