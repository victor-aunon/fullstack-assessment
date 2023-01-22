import { Nullable } from "src/utils";
import { Currency } from "../models/currency";
import { CurrencyExchangeData } from "../interfaces";

export interface ICurrencyRepository {
  subscribe(currency: Currency): Promise<void>;
  findAllSubscriptions(): Promise<Currency[]>;
  findByCode(code: string): Promise<Nullable<Currency>>;
  updateData(
    currency: Currency,
    exchangeData: CurrencyExchangeData
  ): Promise<void>;
  changeSubscription(currency: Currency): Promise<void>;
}
