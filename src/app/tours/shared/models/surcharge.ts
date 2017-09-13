export interface ISurcharge {
  SurchargeId: number;
  Name: string;
  Status: string;
  CreatedAt: Date;
  CreatedBy: number;
  UpdatedAt: Date;
  UpdatedBy: number
}
export class Surcharge implements ISurcharge {
  SurchargeId: number;
  Name: string;
  Status: string;
  CreatedAt: Date;
  CreatedBy: number;
  UpdatedAt: Date;
  UpdatedBy: number
}
