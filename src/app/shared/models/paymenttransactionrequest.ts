export interface IPaymentTransactionRequest {
  amount: string;
  bill_to_forename: string;
  bill_to_surname: string;
  bill_to_email: string;
  bill_to_phone?: string;
  bill_to_address_line1: string;
  bill_to_address_city: string;
  bill_to_address_state?: string;
  bill_to_address_country: string;
  bill_to_address_postal_code?: string;
  CurrencyId: string; // (1=VND, 2=USD, 3=EUR)
  card_type: string; // (001: Visa, 002: MasterCard, 007: JCB )
  card_number: string;
  card_expiry_date: string;
  card_cvn: string;
}
export class PaymentTransactionRequest implements IPaymentTransactionRequest {
  amount: string;
  bill_to_forename: string;
  bill_to_surname: string;
  bill_to_email: string;
  bill_to_phone?: string;
  bill_to_address_line1: string;
  bill_to_address_city: string;
  bill_to_address_state?: string;
  bill_to_address_country: string;
  bill_to_address_postal_code?: string;
  CurrencyId: string; // (1=VND, 2=USD, 3=EUR)
  card_type: string; // (001: Visa, 002: MasterCard, 007: JCB )
  card_number: string;
  card_expiry_date: string;
  card_cvn: string;
}
