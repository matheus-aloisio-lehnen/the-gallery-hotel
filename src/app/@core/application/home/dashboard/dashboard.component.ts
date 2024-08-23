import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Room } from "../../../domain/model/room";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Router, RouterLink } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { Reservation } from "../../../domain/model/reservation";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";
import { selectCheckoutList } from "../../../infra/store/ngrx/selectors/reservation.selector";
import { setCheckout, setReservation } from "../../../infra/store/ngrx/actions/reservation.actions";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
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
        TitleCasePipe
    ],
})
export class DashboardComponent {

    checkoutResearch: string;
    reservationResearch: string;
    showCheckoutDetails: boolean;
    showReservationDetails: boolean;

    constructor(
        private store: Store<AppState>,
        private router: Router,
    ) {
        this.checkoutResearch = '';
        this.reservationResearch = '';
        this.showCheckoutDetails = false;
        this.showReservationDetails = false;
        this.store.select(selectCheckoutList).subscribe(result => console.log('oi', result));
    }

    countFreeRooms(roomList: Room[]): number {
        return roomList.reduce((total: number, room: Room): number => {
            return room.status === RoomStatus.free
                ? total + 1
                : total;
        }, 0)
    }
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
        const searchString = this.checkoutResearch.toLowerCase();
        const checkout = this.searchGuestName(checkoutList, searchString);
        this.store.dispatch(setCheckout({ checkout: checkout }));
        this.showCheckoutDetails = !!checkout;
    }

    onReservationResearchChanges(reservationList: Reservation[] | null) {
        const searchString = this.reservationResearch.toLowerCase();
        const reservation = this.searchGuestName(reservationList, searchString);
        this.store.dispatch(setReservation({ reservation: reservation }));
        this.showReservationDetails = !!reservation;
    }

    searchGuestName(list: Reservation[] | null, searchString: string) {
        return list?.find((reservation: Reservation) => {
            const guestName = reservation.guest.personalData?.name.toLowerCase();
            return guestName?.includes(searchString) && searchString !== ''
        }) ?? null;
    }

    checkout() {

    }

    checkin() {

    }

}
