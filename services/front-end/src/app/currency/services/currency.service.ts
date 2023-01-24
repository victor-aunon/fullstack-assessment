import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { Currency } from "../types";
import { setCurrencies, setMessage, resetMessage } from "../../state";
import { AppState } from "../../state";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}

  getCurrencies() {
    const currenciesUrl = `${environment.apiUrl}/currencies`;
    this.http.get<{ data: Currency[] }>(currenciesUrl).subscribe({
      next: response => {
        this.store.dispatch(resetMessage());
        this.store.dispatch(
          setCurrencies({ currencies: response.data })
        );
      },
      error: error => {
        this.store.dispatch(setMessage({message: error.error.data}));
        console.error(error);
      },
    });
  }

  subscribeCurrency(currencyCode: string) {
    const subscribeUrl = `${environment.apiUrl}/currency`;
    this.http
      .post<{ data: Currency }>(
        subscribeUrl,
        { code: currencyCode },
        this.httpOptions
      )
      .subscribe({
        next: () => {
          this.store.dispatch(resetMessage());
          this.getCurrencies()
        },
        error: error => {
          this.store.dispatch(setMessage({message: error.error.data}));
          console.error(error);
        },
      });
  }

  unSubscribeCurrency(currencyCode: string) {
    const unSubscribeUrl = `${environment.apiUrl}/currency/${currencyCode}`;
    this.http
      .put<{ data: Currency }>(unSubscribeUrl, {})
      .subscribe({
        next: () => {
          this.store.dispatch(resetMessage());
          this.getCurrencies()
        },
        error: error => {
          this.store.dispatch(setMessage({message: error.error.data}));
          console.error(error);
        },
      });
  }
}
