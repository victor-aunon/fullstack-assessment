import { DomainError } from "@app/utils";

export class FxApiKeyNotDefined extends DomainError {
  static obtainApiKeyUrl = "https://www.alphavantage.co/support/#api-key";
  constructor(errMessage) {
    super(errMessage);
  }

  static throw() {
    throw new FxApiKeyNotDefined(
      "Alpha Vantage API key not provided. Make sure to get an API key at " +
      `${this.obtainApiKeyUrl} and set an environment variable ` +
      "ALPHAVANTAGE_APIKEY with the requested API key."
    );
  }
}
