import {
  connectToDatabase,
  disconnectFromDatabase,
  removeDatabase,
} from "@app/app";
import { Currency } from "@app/currency";
import { retrieveData } from "@app/retrieveData";
import {
  GetSubscribedCurrencies,
  SubscribeCurrency,
  UnsubscribeCurrency,
} from "@app/currency/application";
import {
  CurrenciesNotUpdatedMessage,
  CurrenciesUpdatedMessage,
} from "@app/currency/domain/messages";

describe("Testing API", () => {
  beforeAll(() => {
    connectToDatabase(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await removeDatabase(process.env.MONGODB_URI_TEST);
    await disconnectFromDatabase();
  });

  async function getCurrencies() {
    const getSubscribedCurrencies = new GetSubscribedCurrencies({});
    return await getSubscribedCurrencies.execute();
  }

  async function subscribeCurrency(code: string) {
    const subscribeCurrency = new SubscribeCurrency({});
    await subscribeCurrency.execute(code);
  }

  async function unSubscribeCurrency(code: string) {
    const unSubscribeCurrency = new UnsubscribeCurrency({});
    await unSubscribeCurrency.execute(code);
  }

  it("Should not update any currency if there are no currencies", async () => {
    const result = await retrieveData();
    expect(result).toBe(CurrenciesNotUpdatedMessage.send());
  });

  it("Should only update subscribed currencies", async () => {
    // Subscribe two new currencies: GBP and JPY
    await subscribeCurrency("GBP");
    await subscribeCurrency("JPY");

    // Get the subscribed currencies
    const currencies = await getCurrencies();

    // Unsubscribe JPY
    await unSubscribeCurrency("JPY");

    // Update the subscribed currencies
    const result = await retrieveData();
    expect(result).toBe(CurrenciesUpdatedMessage.send(["GBP"]));

    // Check that GBP has been updated
    const updatedCurrencies = await getCurrencies();
    expect(updatedCurrencies).toHaveLength(1);
    const previousGBP = currencies.filter(
      currency => currency.code === "GBP"
    )[0];
    const currentGBP = updatedCurrencies.filter(
      currency => currency.code === "GBP"
    )[0];
    // Compare the updated date
    expect(currentGBP.updatedAt.getTime()).toBeGreaterThan(
      previousGBP.updatedAt.getTime()
    );
  });
});
