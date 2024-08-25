import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import { toggleDarkMode } from "../../../infra/store/ngrx/actions/dark-mode.actions";
import { RouteList } from "../../../domain/enum/route-list.enum";
import { ErrorMessengerUtil } from "../../../infra/utils/form/messenger/error-messenger.util";
import { AppState } from "../../../domain/type/app-state.type";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: [ './base.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent extends ErrorMessengerUtil {


    protected readonly RouteList = RouteList
    isDarkMode$: Observable<boolean>;

    constructor(
        protected store: Store<AppState>,
        protected router: Router,
    ) {
        super();
        this.isDarkMode$ = this.store.select((appState: AppState) => appState.isDarkMode);
    }

    changeThemeMode(isDarkMode: boolean): void {
        this.store.dispatch(toggleDarkMode(isDarkMode));
    }

    logout() {
        this.router.navigate([ RouteList.signIn ])
        // this.router.navigate([ '' ])
    }

}
