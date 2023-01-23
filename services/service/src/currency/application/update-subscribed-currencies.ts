import { ICurrencyRepository, IFxFetcherRepository } from "../domain";
import { CurrencyExchangeData } from "../domain/interfaces";
import {
  MongooseCurrencyRepository,
  FxFetcherRepository,
} from "../infrastructure";
import {
  CurrenciesNotUpdatedMessage,
  CurrenciesUpdatedMessage,
} from "../domain/messages";

export class UpdateSubscribedCurrencies {
  private currencyRepository: ICurrencyRepository;
  private fxFetcherRepository: IFxFetcherRepository;
  constructor({
    currencyRepository = new MongooseCurrencyRepository(),
    fxFetcherRepository = new FxFetcherRepository("EUR")
  }) {
    this.currencyRepository = currencyRepository
    this.fxFetcherRepository = fxFetcherRepository;
  }

  async execute(): Promise<string> {
    const currencies = await this.currencyRepository.findAllSubscriptions();

    if (currencies.length === 0) {
      return CurrenciesNotUpdatedMessage.send();
    }

    for (let i = 0; i < currencies.length; i++) {
      const fxData: CurrencyExchangeData =
        await this.fxFetcherRepository.getCurrencyExchangeData(
          currencies[i].code
        );
      await this.currencyRepository.updateData(currencies[i], fxData);
    }

    const updatedCodes = currencies.map(currency => currency.code);
    return CurrenciesUpdatedMessage.send(updatedCodes);
  }
}
