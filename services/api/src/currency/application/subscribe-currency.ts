import {
  Currency,
  CurrencyAlreadySubscribedError,
  ICurrencyRepository,
  IFxFetcherRepository,
} from "../domain";
import {
  MongooseCurrencyRepository,
  FxFetcherRepository,
} from "../infrastructure";
import { CurrencyExchangeData } from "../domain/interfaces";

export class SubscribeCurrency {
  private currencyRepository: ICurrencyRepository;
  private fxFetcherRepository: IFxFetcherRepository;
  constructor({
    currencyRepository = new MongooseCurrencyRepository(),
    fxFetcherRepository = new FxFetcherRepository("EUR"),
  }) {
    this.currencyRepository = currencyRepository;
    this.fxFetcherRepository = fxFetcherRepository;
  }

  async execute(code: string) {
    const currency = await this.currencyRepository.findByCode(code);

    if (currency && currency.hasSubscription) {
      return CurrencyAlreadySubscribedError.withCode(currency.code);
    }

    // Change hasSubscription to false instead of creating another document
    if (currency && !currency.hasSubscription) {
      currency.subscribe();
      await this.currencyRepository.changeSubscription(currency);
      return currency;
    }

    const newCurrency = await Currency.create({ code });
    const fxData = await this.fxFetcherRepository.getCurrencyExchangeData(code);
    await this.currencyRepository.subscribe(
      newCurrency as Currency,
      fxData as CurrencyExchangeData
    );
    return await this.currencyRepository.findByCode(code);
  }
}
