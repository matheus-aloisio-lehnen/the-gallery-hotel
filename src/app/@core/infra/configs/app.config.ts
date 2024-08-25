import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MAT_RADIO_DEFAULT_OPTIONS } from "@angular/material/radio";
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from "@angular/material/paginator";
import { provideStore } from "@ngrx/store";

import { MAT_RADIO_CONFIG } from "./mat-radio.config";
import { MAT_FORM_FIELD_CONFIG } from "./mat-form-field.config";
import { reducers } from "../store/ngrx/reducer";
import { SNACKBAR } from "./mat-snackbar.config";
import { provideHttpClient } from "@angular/common/http";
import { provideNgxMask } from "ngx-mask";
import { registerLocaleData } from "@angular/common";
import ptBr from '@angular/common/locales/pt';
import { routes } from "../../../app.routes";
import { MAT_CARD_CONFIG } from "@angular/material/card";
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";
import { MAT_CARD_DEFAULT_CONFIG } from "./mat-card.config";
import { MAT_PAGINATOR_DEFAULT_CONFIG } from "./paginator.config";
import { MAT_TOOLTIP_CONFIG } from "./mat-tooltip.config";
import { CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { CURRENCY_MASK } from "./mask.config";
registerLocaleData(ptBr);


export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore(reducers),
        provideHttpClient(),
        provideNgxMask(),
        provideNativeDateAdapter(),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MAT_FORM_FIELD_CONFIG },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR.success },
        { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: MAT_RADIO_CONFIG },
        { provide: MAT_CARD_CONFIG, useValue: MAT_CARD_DEFAULT_CONFIG },
        { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: MAT_PAGINATOR_DEFAULT_CONFIG },
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MAT_TOOLTIP_CONFIG },
        { provide: CURRENCY_MASK_CONFIG, useValue: CURRENCY_MASK }
    ]
};
