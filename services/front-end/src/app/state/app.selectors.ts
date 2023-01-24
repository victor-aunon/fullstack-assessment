import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectAppFeature = (state: any) => state.app as AppState

export const selectCurrencies = createSelector(
  selectAppFeature,
  (state: AppState) => state.currencies
)

export const selectMessage = createSelector(
  selectAppFeature,
  (state: AppState) => state.message
) 
