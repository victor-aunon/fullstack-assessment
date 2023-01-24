import { Component, OnInit, Input } from "@angular/core";
import { CurrencyService } from "src/app/currency/services/currency.service";
import { Currency } from "src/app/currency/types";

@Component({
  selector: "app-currency-card",
  templateUrl: "./currency-card.component.html",
  styleUrls: ["./currency-card.component.scss"],
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency!: Currency;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  getLowDifference(): number {
    if (this.currency._dailyHistory.length == 0) return 0.0;

    const currentLow = this.currency._dailyHistory[0].low;
    const previousLow = this.currency._dailyHistory[1].low;

    return ((currentLow - previousLow) / previousLow) * 100;
  }

  getHighDifference(): number {
    if (this.currency._dailyHistory.length == 0) return 0.0;

    const currentHigh = this.currency._dailyHistory[0].high;
    const previousHigh = this.currency._dailyHistory[1].high;

    return ((currentHigh - previousHigh) / previousHigh) * 100;
  }

  unSubscribe() {
    this.currencyService.unSubscribeCurrency(this.currency._code);
  }
}
