import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReservationService } from "../../service/reservation.service";
import { Store } from "@ngrx/store";

import { AppState } from "../../../../../infra/store/ngrx/state/app.state";
import { Reservation } from "../../../../../domain/model/reservation";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader, MatCardModule,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import { TitleCasePipe } from "@angular/common";

@Component({
    selector: 'app-delete-reservation',
    templateUrl: './delete-reservation.component.html',
    styleUrl: './delete-reservation.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        TitleCasePipe
    ]
})
export class DeleteReservationComponent {


    constructor(
        @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
        private reservationService: ReservationService,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<DeleteReservationComponent>
    ) {
    }

    async delete() {
        await this.reservationService.delete(this.reservation);
    }

}
