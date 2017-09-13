import { Attraction4Review } from './attraction4review'
export interface ITourItineraryDetail {
  TourItineraryDetailId: number;
  Attraction4Review: Attraction4Review;
  DepartureTime: string;
}
export class TourItineraryDetail implements ITourItineraryDetail {
  TourItineraryDetailId: number;
  Attraction4Review: Attraction4Review;
  DepartureTime: string;
}
