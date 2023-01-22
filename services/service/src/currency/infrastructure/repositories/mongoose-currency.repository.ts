import { Currency, ICurrencyRepository } from "@app/currency/domain";
import { CurrencyExchangeData } from "@app/currency/domain/interfaces";
import { Nullable } from "@app/utils";
import CurrencySchema from "../schema/mongoose-currency.schema";

export class MongooseCurrencyRepository implements ICurrencyRepository {
  private toDomain(currencyDB) {
    return Currency.fromPrimitives({
      id: currencyDB._id,
      code: currencyDB.code,
      hasSubscription: currencyDB.hasSubscription,
      toCurrencyCode: currencyDB.toCurrencyCode,
      ask: currencyDB.ask,
      bid: currencyDB.bid,
      spread: currencyDB.spread,
      spreadPipes: currencyDB.spreadPipes,
      exchangeRate: currencyDB.exchangeRate,
      updatedAt: currencyDB.updatedAt,
      dailyHistory: currencyDB.dailyHistory,
    });
  }

  private fromDomain(currency: Currency) {
    return {
      _id: currency.id,
      code: currency.code,
      hasSubscription: currency.hasSubscription,
      ask: currency.ask,
      bid: currency.bid,
      spread: currency.spread,
      spreadPipes: currency.spreadPipes,
      exchangeRate: currency.exchangeRate,
      dailyHistory: currency.dailyHistory,
    };
  }

  async subscribe(currency: Currency): Promise<void> {
    const mongooseCurrency = this.fromDomain(currency);
    await CurrencySchema.create(mongooseCurrency);
  }

  async findAllSubscriptions(): Promise<Currency[]> {
    const subscribedCurrencies = await CurrencySchema.find({
      hasSubscription: true,
    });

    return subscribedCurrencies.map(currency => this.toDomain(currency));
  }

  async findByCode(code: string): Promise<Nullable<Currency>> {
    const currency = await CurrencySchema.findOne({ code: code });
    return currency === null ? null : this.toDomain(currency);
  }

  async updateData(
    currency: Currency,
    exchangeData: CurrencyExchangeData
  ): Promise<void> {
    const document = { ...this.fromDomain(currency), ...exchangeData };
    await CurrencySchema.updateOne(
      { _id: currency.id },
      { $set: document },
      { upsert: false }
    );
  }

  async changeSubscription(currency: Currency): Promise<void> {
    const document = this.fromDomain(currency);
    await CurrencySchema.updateOne(
      { _id: currency.id },
      { $set: document },
      { upsert: false }
    );
  }
}
