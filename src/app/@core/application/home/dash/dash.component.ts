import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router, RouterLink } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { AsyncPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";

import { Reservation } from "../../../domain/interface/reservation.interface";
import { AppState } from "../../../domain/type/app-state.type";
import { BaseComponent } from "../../shared/base/base.component";
import { DashService } from "../../../infra/services/service/dashboard/dash.service";
import { Observable } from "rxjs";
import { SummaryCard } from "../../../domain/type/summary-card.type";
import { selectSummaryCard } from "../../../infra/store/ngrx/selectors/summary-card.selector";
import { Room } from "../../../domain/interface/room.interface";
import { selectAllRooms } from "../../../infra/store/ngrx/selectors/room.selector";
import { addRoomsToList, selectRoom } from "../../../infra/store/ngrx/actions/room.actions";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { MatRipple } from "@angular/material/core";

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        LetDirective,
        MatButtonModule,
        RouterLink,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NgxMaskDirective,
        DatePipe,
        TitleCasePipe,
        AsyncPipe,
        MatRipple
    ],
})
export class DashComponent extends BaseComponent implements OnInit, OnDestroy {


    summaryCard$: Observable<SummaryCard | null>;
    roomList$: Observable<Room[]>;
    now: Date;
    selectedRoom?: Room;

    constructor(
        store: Store<AppState>,
        router: Router,
        private dashService: DashService,
    ) {
        super(store, router);
        this.summaryCard$ = this.store.select(selectSummaryCard);
        this.roomList$ = this.store.select(selectAllRooms);
        this.now = new Date();
    }

    ngOnInit() {
        this.dashService.loadData();
    }


    // countFreeRooms(roomList: Room[]) {
    //     return 0;
    // return roomList.reduce((total: number, room: Room): number => {
    //     return room.status === RoomStatus.free
    //         ? total + 1
    //         : total;
    // }, 0)
    // }
    //
    // countTodayCheckouts(roomList: Room[]) {
    //     return roomList.reduce((total: number, room: Room): number => {
    //         const hasCheckoutForToday = room.reservations?.find((reservation: Reservation) => {
    //             const today = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
    //             const checkOut = formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR');
    //             return today === checkOut;
    //         });
    //         return hasCheckoutForToday
    //             ? total + 1
    //             : total;
    //     }, 0)
    // }
    //
    // countTodayReservations(roomList: Room[]) {
    //     return roomList.reduce((total: number, room: Room): number => {
    //         const hasReservationForToday = room.reservations?.find((reservation: Reservation) => {
    //             const checkIn = formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
    //             const today = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
    //             return checkIn === today
    //         });
    //         return hasReservationForToday
    //             ? total + 1
    //             : total;
    //     }, 0)
    // }

    onCheckoutResearchChanges(checkoutList: Reservation[] | null) {
        // const searchString = this.checkoutResearch.toLowerCase();
        // const checkout = this.searchGuestName(checkoutList, searchString);
        // this.store.dispatch(setCheckout({ checkout: checkout }));
        // this.showCheckoutDetails = !!checkout;
    }

    onReservationResearchChanges(reservationList: Reservation[] | null) {
        // const searchString = this.reservationResearch.toLowerCase();
        // const reservation = this.searchGuestName(reservationList, searchString);
        // this.store.dispatch(setReservation({ reservation: reservation }));
        // this.showReservationDetails = !!reservation;
    }

    searchGuestName(list: Reservation[] | null, searchString: string) {
        // return list?.find((reservation: Reservation) => {
        //     const guestName = reservation.guest.personalData?.name.toLowerCase();
        //     return guestName?.includes(searchString) && searchString !== ''
        // }) ?? null;
    }

    checkout() {

    }

    checkin() {

    }

    ngOnDestroy() {
        this.store.dispatch(addRoomsToList({ roomList: [] }))
    }

    protected readonly RoomStatus = RoomStatus;
}
