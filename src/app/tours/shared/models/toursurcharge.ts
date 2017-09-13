import { Surcharge } from './surcharge';
import { Currency} from '../../../shared/models/currency';
import { Status } from '../../../shared/models/status';
export interface ITourSurcharge {
  TourSurchargeId: number;
  Surcharge: Surcharge;
  Price: number;
  Status: Status;
  Currency: Currency;
}
export class TourSurcharge implements ITourSurcharge {
  TourSurchargeId: number;
  Surcharge: Surcharge;
  Price: number;
  Status: Status;
  Currency: Currency;
}
