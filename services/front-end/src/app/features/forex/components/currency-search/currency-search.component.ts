import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-currency-search',
  templateUrl: './currency-search.component.html',
  styleUrls: ['./currency-search.component.scss'],
})
export class CurrencySearchComponent implements OnInit {
  searchCurrencyForm = this.formBuilder.group({
    searchCurrencyCode: ""
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const currencyCode = this.searchCurrencyForm.value.searchCurrencyCode

    // Do not pass any value if currencyCode is an empty string or has less
    // then 3 characters
    if (!currencyCode || currencyCode.length < 3) return
    this.searchCurrencyForm.reset()
  }
}
