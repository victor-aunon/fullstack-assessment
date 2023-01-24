import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState, selectCurrencies } from "src/app/state";
import { Currency } from "src/app/currency/types";
import { CurrencyService } from "src/app/currency/services/currency.service";

@Component({
  selector: "app-currency-list",
  templateUrl: "./currency-list.component.html",
  styleUrls: ["./currency-list.component.scss"],
})
export class CurrencyListComponent implements OnInit {
  currencies$: Observable<Currency[]> = new Observable();

  constructor(
    private store: Store<AppState>,
    private currencyService: CurrencyService
  ) {
    this.currencies$ = this.store.select(selectCurrencies);
  }

  ngOnInit(): void {
    this.currencyService.getCurrencies();
  }
}
