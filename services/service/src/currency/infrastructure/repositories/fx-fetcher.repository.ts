import axios from "axios";
import { IFxFetcherRepository } from "@app/currency/domain";
import { CurrencyExchangeData } from "@app/currency/domain/interfaces";
import { FxApiKeyNotDefined } from "@app/currency/domain/errors";
import { pipUnits } from "@app/utils";
import { round } from "@app/utils/math/round";

export class FxFetcherRepository implements IFxFetcherRepository {
  private _fxApiBaseUrl = "https://www.alphavantage.co/query?";
  private _apiKey: string;
  toCurrencyCode: string;

  constructor(toCurrencyCode = "EUR") {
    this.checkApiKey();
    this.toCurrencyCode = toCurrencyCode.toUpperCase();
  }

  private checkApiKey() {
    const apiKey = process.env.ALPHAVANTAGE_APIKEY;
    if (!apiKey) return FxApiKeyNotDefined.throw();
    this._apiKey = apiKey;
  }

  async getCurrencyExchangeData(code: string): Promise<CurrencyExchangeData> {
    const codeUp = code.toUpperCase();
    const exchangeRateUrl = `${this._fxApiBaseUrl}function=CURRENCY_EXCHANGE_RATE&from_currency=${codeUp}&to_currency=${this.toCurrencyCode}&apikey=${this._apiKey}`;

    const dailyDataUrl = `${this._fxApiBaseUrl}function=FX_DAILY&from_symbol=${codeUp}&to_symbol=${this.toCurrencyCode}&apikey=${this._apiKey}`;

    const axiosConfig = {
      headers: { "User-Agent": "request" },
    };

    const fetchUrl = url => axios.get(url, axiosConfig);
    const promises = [exchangeRateUrl, dailyDataUrl].map(fetchUrl);

    const fxData = {};

    // Resolving the promises simultaneously
    const responses = await Promise.all(promises);
    responses.forEach(res => {
      if (res.config.url.includes("CURRENCY_EXCHANGE_RATE")) {
        const dataHeader = "Realtime Currency Exchange Rate";
        fxData["exchangeRate"] = Number(
          res.data[dataHeader]["5. Exchange Rate"]
        );
        fxData["bid"] = Number(res.data[dataHeader]["8. Bid Price"]);
        fxData["ask"] = Number(res.data[dataHeader]["9. Ask Price"]);
        fxData["spread"] = fxData["ask"] - fxData["bid"];
        fxData["spreadPipes"] = round(
          fxData["spread"] * pipUnits.get(codeUp),
          1
        );
      } else if (res.config.url.includes("FX_DAILY")) {
        const dataHeader = "Time Series FX (Daily)";
        const dailyData = Object.entries(res.data[dataHeader]).slice(0, 7);
        const dailyHistory: CurrencyExchangeData["dailyHistory"] = [];

        dailyData.forEach(([date, data]) => {
          dailyHistory.push({
            date,
            open: Number(data["1. open"]),
            high: Number(data["2. high"]),
            low: Number(data["3. low"]),
            close: Number(data["4. close"]),
          });
        });

        fxData["dailyHistory"] = dailyHistory;
      }
    });

    return fxData as CurrencyExchangeData;
  }
}
