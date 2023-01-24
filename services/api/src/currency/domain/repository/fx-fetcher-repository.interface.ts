import {
  CurrencyExchangeData,
} from "@app/currency/domain/interfaces";

export interface IFxFetcherRepository {
  getCurrencyExchangeData(code: string): Promise<CurrencyExchangeData | void>;
}
