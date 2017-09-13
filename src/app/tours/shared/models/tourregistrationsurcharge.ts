import { TourSurcharge } from './toursurcharge';
import { Status } from '../../../shared/models/status';
export interface ITourRegistrationSurcharge {
  TourRegistrationSurchargeId: number;
  TourSurcharge: TourSurcharge;
  Status: Status;
  TotalCount: number;
}
export class TourRegistrationSurcharge implements ITourRegistrationSurcharge {
  TourRegistrationSurchargeId: number;
  TourSurcharge: TourSurcharge;
  Status: Status;
  TotalCount: number;
}
