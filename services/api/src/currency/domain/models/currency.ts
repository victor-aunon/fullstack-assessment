import { Types } from "mongoose";
import { CurrencyNotSubscribedError, IncorrectCurrencyError, CurrencyAlreadySubscribedError } from "../errors";
import { ICurrency } from "../interfaces";
import { FxFetcherRepository } from "@app/currency/infrastructure/repositories";

export class Currency {
  private _id: Types.ObjectId;
  private _code: string;
  private _hasSubscription: boolean;
  private _toCurrencyCode: string
  private _ask: number
  private _bid: number
  private _spread: number
  private _spreadPipes: number
  private _exchangeRate: number
  private _dailyHistory: ICurrency["dailyHistory"]

  private constructor(currencyProps: ICurrency) {
    this._id = currencyProps.id;
    this._code = currencyProps.code;
    this._hasSubscription = currencyProps.hasSubscription;
    this._toCurrencyCode = currencyProps.toCurrencyCode
    this._ask = currencyProps.ask
    this._bid = currencyProps.bid
    this._spread = currencyProps.spread
    this._spreadPipes = currencyProps.spreadPipes
    this._exchangeRate = currencyProps.exchangeRate
    this._dailyHistory = currencyProps.dailyHistory
  }

  static fromPrimitives(currencyProps: ICurrency) {
    return new Currency(currencyProps);
  }

  static async create({
    id = new Types.ObjectId(),
    code,
    hasSubscription = true,
    toCode = "EUR",
  }) {
    if (!code) {
      return IncorrectCurrencyError.withCode(code);
    }

    return new Currency({
      id,
      code,
      hasSubscription,
      toCurrencyCode: toCode,
      ask: 0.0,
      bid: 0.0,
      spread: 0.0,
      spreadPipes: 0.0,
      exchangeRate: 0.0,
      dailyHistory: [],
    });
  }

  get id(): Types.ObjectId {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get hasSubscription(): boolean {
    return this._hasSubscription;
  }

  get toCurrencyCode(): string {
    return this._toCurrencyCode;
  }

  get ask(): number {
    return this._ask;
  }

  get bid(): number {
    return this._bid;
  }

  get spread(): number {
    return this._spread;
  }

  get spreadPipes(): number {
    return this._spreadPipes;
  }

  get exchangeRate(): number {
    return this._exchangeRate;
  }

  get dailyHistory(): ICurrency["dailyHistory"] {
    return this._dailyHistory;
  }

  subscribe() {
    if (this._hasSubscription) {
      return CurrencyAlreadySubscribedError.withCode(this._code);
    }

    this._hasSubscription = true;
  }

  unsubscribe() {
    if (!this._hasSubscription) {
      return CurrencyNotSubscribedError.withCode(this._code);
    }

    this._hasSubscription = false;
  }
}
