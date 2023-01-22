import { DomainError } from "@app/utils";

export class IncorrectFxApiCall extends DomainError {
  constructor(errMessage) {
    super(errMessage);
  }

  static throw() {
    throw new IncorrectFxApiCall("Invalid Alpha Vantage API call");
  }
}
