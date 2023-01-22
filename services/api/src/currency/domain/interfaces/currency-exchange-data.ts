interface CurrencyHistoricalData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface CurrencyExchangeData {
  exchangeRate: number;
  bid: number;
  ask: number;
  spread: number;
  spreadPipes: number;
  dailyHistory: CurrencyHistoricalData[];
}
