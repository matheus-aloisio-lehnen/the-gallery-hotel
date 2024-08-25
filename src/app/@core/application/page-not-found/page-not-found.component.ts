import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { LetDirective } from "@ngrx/component";
import { Store } from "@ngrx/store";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";

import { BaseComponent } from "../shared/base/base.component";
import { AppState } from "../../domain/type/app-state.type";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: [ './page-not-found.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        LetDirective,
        MatSidenavContainer,
        MatSidenavContent,
    ]
})
export class PageNotFoundComponent extends BaseComponent {


    constructor(
        store: Store<AppState>,
        router: Router
    ) {
        super(store, router)
    }
}
