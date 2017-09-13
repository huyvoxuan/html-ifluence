import { TourItineraryDetail } from './touritinerarydetail'
export interface ITourItineraryInfo {
  TourItineraryId: number;
  DepartureDate: number;
  Name: string;
  Description: string;
  DepartureDateNormal: Date;
  TourItineraryDetails: TourItineraryDetail[];
}
export class TourItineraryInfo implements ITourItineraryInfo {
  TourItineraryId: number;
  DepartureDate: number;
  Name: string;
  Description: string;
  DepartureDateNormal: Date;
  TourItineraryDetails: TourItineraryDetail[];
}
