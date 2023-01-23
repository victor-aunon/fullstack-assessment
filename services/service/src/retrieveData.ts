// IMPLEMENT YOUR SOLUTION HERE!!
import { UpdateSubscribedCurrencies } from "@app/currency/application";

export async function retrieveData() {
  const updateSubscribedCurrencies = new UpdateSubscribedCurrencies({});

  return await updateSubscribedCurrencies.execute();
}
