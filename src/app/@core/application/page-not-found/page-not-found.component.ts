import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { LetDirective } from "@ngrx/component";
import { Observable } from "rxjs";

import { ConfigService } from "../../infra/services/config/config.service";
import { AppState } from "../../infra/store/ngrx/state/app.state";
import { Store } from "@ngrx/store";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { BaseComponent } from "../shared/base/base.component";
import { routes } from "../../../app.routes";

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
