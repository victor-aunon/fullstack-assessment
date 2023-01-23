import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Currency, ApiCurrencyResponse } from "../types";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  currencies: Currency[] = [];
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getCurrencies() {
    const currenciesUrl = `${environment.apiUrl}/currencies`;
    this.http
      .get<ApiCurrencyResponse>(currenciesUrl)
      .subscribe(res => console.log(res.data));
  }

  subscribeCurrency(currencyCode: string) {
    const subscribeUrl = `${environment.apiUrl}/currency`;
    this.http
      .post<ApiCurrencyResponse>(
        subscribeUrl,
        { code: currencyCode },
        this.httpOptions
      )
      .subscribe(res => console.log(res.data));
  }

  unSubscribeCurrency(currencyCode: string) {
    const unSubscribeUrl = `${environment.apiUrl}/currency/${currencyCode}`;
    this.http
      .put<ApiCurrencyResponse>(unSubscribeUrl, {})
      .subscribe(res => console.log(res.data));
  }
}
