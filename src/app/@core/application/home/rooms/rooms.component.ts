import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatCardModule, } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";
import { CurrencyPipe, DatePipe, formatDate, TitleCasePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";

import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { Room } from "../../../domain/model/room";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Reservation } from "../../../domain/model/reservation";
import { setRoom } from "../../../infra/store/ngrx/actions/room.actions";
import { setReservation } from "../../../infra/store/ngrx/actions/reservation.actions";
import { CpfPipe } from "../../../infra/utils/pipes/cpf.pipe";
import { CheckInComponent } from "./dialogs/check-in/check-in.component";
import { ReservationService } from "../reservations/service/reservation.service";


@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
        MatTooltipModule,
        MatRippleModule,
        MatExpansionModule,
        TitleCasePipe,
        LetDirective,
        DatePipe,
        CurrencyPipe,
        CpfPipe
    ],
})
export class RoomsComponent implements OnDestroy {

    protected readonly RoomStatusEnum: typeof RoomStatus;

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private dialog: MatDialog,
        private reservationService: ReservationService
    ) {
        this.RoomStatusEnum = RoomStatus;
    }

    selectRoom(room: Room) {
        this.store.dispatch(setRoom({ room: room }));
        const selectedReservation = this.findReservation(room);
        this.store.dispatch(setReservation({ reservation: selectedReservation }))
    }

    findReservation(room: Room) {
        const formattedToday = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
        return room.reservations?.find((reservation: Reservation) => formattedToday >= formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR') && formattedToday <= formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR')) ?? null;
    }

    async checkin(room: Room) {
        const reservation = this.findReservation(room);
        const result = reservation
            ? await this.reservationService.checkin(reservation)
            : await firstValueFrom(this.dialog.open(CheckInComponent).afterClosed());
        // this.store.dispatch(updateRoomInList({ room: updatedRoom }));
        // this.store.dispatch(setRoom({ room: null }));
    }

    async checkout(room: Room) {
        const reservation = this.findReservation(room);
        if(!reservation) return;
        const result = await this.reservationService.checkout(reservation);
        // this.store.dispatch(updateRoomInList({ room: updatedRoom }));
        // this.store.dispatch(setRoom({ room: null }));
    }

    ngOnDestroy() {
        this.store.dispatch(setRoom({ room: null }));
    }
}
