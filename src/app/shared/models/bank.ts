import { Currency } from './currency';
/**
 * bank info
 */
 export interface IBankInfo {
  BankId: number;
  Name: string;
  Code: string;
  LogoURL: string;
}
export class BankInfo implements IBankInfo {
  BankId: number;
  Name: string;
  Code: string;
  LogoURL: string;
}

/**
 * bank account info
 */
export interface IBankAccountInfo {
  BankAccountId: number;
  Name: string;
  Bank: string;
  Currency: Currency;
  AccountNo: string;
  SWIFTCode: string;
}
export class BankAccountInfo implements IBankAccountInfo {
  BankAccountId: number;
  Name: string;
  Bank: string;
  Currency: Currency;
  AccountNo: string;
  SWIFTCode: string;
}
