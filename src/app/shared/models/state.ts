import { Country } from './country';
export interface IState {
  StateId: number;
  StateName: string;
  StateCode: string;
  Country: Country;
}
export class State implements IState {
  StateId: number;
  StateName: string;
  StateCode: string;
  Country: Country;
}
