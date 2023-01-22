export class CurrenciesUpdatedMessage {
  static send(codes: string[]) {
    return `Updated exchange data for ${codes.join(",")}`;
  }
}
