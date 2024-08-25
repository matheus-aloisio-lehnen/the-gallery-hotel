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
import { Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";

import { Sidenav } from "../../domain/type/sidenav.type";
import { SIDENAV } from "../../domain/constants/sidenav.constant";
import { ReservationService } from "./reservations/service/reservation.service";
import { BaseComponent } from "../shared/base/base.component";
import { AppState } from "../../domain/type/app-state.type";

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
export class HomeComponent extends BaseComponent {


    navHovered: boolean;
    sidenav: Sidenav[];

    constructor(
        store: Store<AppState>,
        router: Router,
        private reservationService: ReservationService,
    ) {
        super(store, router);
        this.navHovered = false;
        this.sidenav = SIDENAV;
        this.reservationService.getReservations();
    }

}
