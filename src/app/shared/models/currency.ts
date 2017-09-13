export interface ICurrency {
  CurrencyId: number;
  Name: string;
  Symbol: string;
  CreatedAt: Date;
}

export class Currency implements ICurrency {
  CurrencyId: number;
  Name: string;
  Symbol: string;
  CreatedAt: Date;
}
