export interface IStatus {
  StatusId: number;
  Name: string;
  Ordinal: number;
  ColorCode: string;
}
export class Status implements IStatus {
  StatusId: number;
  Name: string;
  Ordinal: number;
  ColorCode: string;
}
