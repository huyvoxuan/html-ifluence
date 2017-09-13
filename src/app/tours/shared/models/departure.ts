import { Country } from '../../../shared/models/country';

export interface IDeparture {
  StateId: number;
  StateName: string;
  StateCode: string;
  Country: Country;


}
export class Departure implements IDeparture {
  StateId: number;
  StateName: string;
  StateCode: string;
  Country: Country;
}
