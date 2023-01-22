import { DomainError } from "@app/utils";

export class IncorrectFxApiKey extends DomainError {
  constructor(errMessage) {
    super(errMessage);
  }

  static throw() {
    throw new IncorrectFxApiKey("Invalid Alpha Vantage API key");
  }
}
