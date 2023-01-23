// IMPLEMENT YOUR SOLUTION HERE!!
import { UpdateSubscribedCurrencies } from "@app/currency/application";

export async function retrieveData() {
  const updateSubcribedCurrencies = new UpdateSubscribedCurrencies({});

  return await updateSubcribedCurrencies.execute();
}
