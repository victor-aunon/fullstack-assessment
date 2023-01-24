import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card"
import { ForexLandingPageComponent } from "./pages/forex-landing-page/forex-landing-page.component";
import { routes } from "./forex.routing";
import { CurrencySearchComponent } from "./components/currency-search/currency-search.component";
import { MessageComponent } from "./components/message/message.component";
import { CurrencyListComponent } from './currency-list/currency-list.component';


export const loader = ["en", "es"].reduce((acc, lang) => {
  acc[lang] = () => import(`./i18n/forex.${lang}.json`);
  return acc;
}, {});

@NgModule({
  declarations: [
    ForexLandingPageComponent,
    CurrencySearchComponent,
    MessageComponent,
    CurrencyListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    MatCardModule,
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
