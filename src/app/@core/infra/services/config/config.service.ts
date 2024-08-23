import { Injectable } from '@angular/core';
import { toggleDarkMode } from "../../store/ngrx/actions/dark-mode.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/ngrx/state/app.state";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {


    constructor(
        private store: Store<AppState>,
    ) {
    }

    changeThemeMode(isDarkMode: boolean): void {
        this.store.dispatch(toggleDarkMode(isDarkMode));
    }

}
