import { createAction, props } from "@ngrx/store";
import { Currency } from "../currency/types";

export const setCurrencies = createAction(
  "[Currencies] Set Currencies",
  props<{currencies: Currency[]}>()
);

export const setMessage = createAction(
  "[Message] Set Message",
  props<{message: string}>()
);

export const resetMessage = createAction("[Message] Reset Message");
