import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { setCurrencies, setMessage, resetMessage } from "./app.actions";

export const initialState: AppState = {
  currencies: [],
  message: "",
};

export const appReducer = createReducer(
  initialState,
  on(setCurrencies, (state, { currencies }) => ({ ...state, currencies })),
  on(setMessage, (state, { message }) => ({ ...state, message })),
  on(resetMessage, state => ({...state, message: "" }))
);
