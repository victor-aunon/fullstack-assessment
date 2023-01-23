import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForexLandingPageComponent } from "./pages/forex-landing-page/forex-landing-page.component";
import { CurrencyListComponent } from "./components/currency-list/currency-list.component";
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { RouterModule } from "@angular/router";
import { routes } from "./forex.routing";
import { CurrencySearchComponent } from "./components/currency-search/currency-search.component";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';

export const loader = ["en", "es"].reduce((acc, lang) => {
  acc[lang] = () => import(`./i18n/forex.${lang}.json`);
  return acc;
}, {});

@NgModule({
  declarations: [
    ForexLandingPageComponent,
    CurrencyListComponent,
    CurrencySearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: "forex",
        loader,
      },
    },
  ],
})
export class ForexModule {}
