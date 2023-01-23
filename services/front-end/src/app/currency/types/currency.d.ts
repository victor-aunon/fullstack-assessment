interface CurrencyHistoricalData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface Currency {
  _id: unknown;
  _code: string;
  _hasSubscription: boolean;
  _toCurrencyCode: string;
  _ask: number;
  _bid: number;
  _spread: number;
  _spreadPipes: number;
  _exchangeRate: number;
  _dailyHistory: CurrencyHistoricalData[];
}
