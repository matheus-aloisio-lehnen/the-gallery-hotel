import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router, RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LetDirective } from "@ngrx/component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";

import { SignInComponent } from "./sign-in/sign-in.component";
import { AppState } from "../../infra/store/ngrx/state/app.state";
import { Loading } from "../../domain/enum/loading.enum";
import { RouteList } from "../../domain/enum/route-list.enum";
import { BaseComponent } from "../shared/base/base.component";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        LetDirective,
        SignInComponent,
        MatProgressSpinner,
        RouterModule,
        MatSidenavContainer,
        MatSidenavContent,
    ]
})
export class AuthComponent extends BaseComponent {


    loading$: Observable<boolean>;

    constructor(
        store: Store<AppState>,
        router: Router
    ) {
        super(store, router);
        this.loading$ = this.store.select((appState: AppState) => {
            return appState.loading[Loading.signIn] || appState.loading[Loading.signUp]
        });
    }

    get signInRoute() {
        return this.router.url.endsWith(RouteList.signIn);
    }

}
