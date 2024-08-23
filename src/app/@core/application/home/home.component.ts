import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { LetDirective } from "@ngrx/component";
import { NgOptimizedImage } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";

import { Sidenav } from "../../domain/type/sidenav.type";
import { AppState } from "../../infra/store/ngrx/state/app.state";
import { SIDENAV } from "../../domain/constants/sidenav.constant";
import { ReservationService } from "./reservations/service/reservation.service";
import { ConfigService } from "../../infra/services/config/config.service";
import { RouteList } from "../../domain/enum/route-list.enum";

@Component({
    selector: 'app-home',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatDividerModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        LetDirective,
        MatTooltipModule,
        NgOptimizedImage
    ]
})
export class HomeComponent {


    isDarkMode$: Observable<boolean>;
    navHovered: boolean;
    sidenav: Sidenav[];

    constructor(
        private router: Router,
        private store: Store<AppState>,
        protected configService: ConfigService,
        private reservationService: ReservationService,
    ) {
        this.isDarkMode$ = this.store.select((appState: AppState) => appState.isDarkMode);
        this.navHovered = false;
        this.sidenav = SIDENAV;
        this.reservationService.getReservations();
    }

    logout() {
        this.router.navigate([ RouteList.signIn ])
        // this.router.navigate([ '' ])
    }

}
