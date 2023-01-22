import { Types } from "mongoose";
import { CurrencyExchangeData } from "./currency-exchange-data";

export interface ICurrency extends CurrencyExchangeData {
  id: Types.ObjectId;
  code: string;
  toCurrencyCode: string;
  hasSubscription: boolean;
  updatedAt: Date
}
