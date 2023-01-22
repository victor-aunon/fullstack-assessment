// IMPLEMENT YOUR SOLUTION HERE!!
import { UpdateSubscribedCurrencies } from "@app/currency/application";

export async function retrieveData() {
  const updateSubcribedCurrencies = new UpdateSubscribedCurrencies({
    toCurrencyCode: "EUR",
  });
  
  return await updateSubcribedCurrencies.execute()
};
