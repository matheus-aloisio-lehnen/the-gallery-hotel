import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MAT_RADIO_DEFAULT_OPTIONS } from "@angular/material/radio";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { provideStore } from "@ngrx/store";

import { MAT_RADIO_CONFIG } from "./mat-radio.config";
import { MAT_FORM_FIELD_CONFIG } from "./mat-form-field.config";
import { reducers } from "../store/ngrx/reducer";
import { BR_PAGINATOR } from "./br-paginator.congif";
import { SNACKBAR } from "./mat-snackbar.config";
import { provideHttpClient } from "@angular/common/http";
import { provideNgxMask } from "ngx-mask";
import { registerLocaleData } from "@angular/common";
import ptBr from '@angular/common/locales/pt';
import { routes } from "../../../app.routes";
import { MAT_CARD_CONFIG } from "@angular/material/card";
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
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MAT_FORM_FIELD_CONFIG },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR.success },
        { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: MAT_RADIO_CONFIG },
        { provide: MatPaginatorIntl, useValue: BR_PAGINATOR },
    ]
};
