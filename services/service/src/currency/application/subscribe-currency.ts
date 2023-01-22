import {
  Currency,
  CurrencyAlreadySubscribedError,
  ICurrencyRepository,
} from "../domain";
import { MongooseCurrencyRepository } from "../infrastructure";

export class SubscribeCurrency {
  private currencyRepository: ICurrencyRepository;
  constructor({ currencyRepository = new MongooseCurrencyRepository() }) {
    this.currencyRepository = currencyRepository;
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
    await this.currencyRepository.subscribe(newCurrency as Currency);
    return newCurrency;
  }
}
