import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { CreateReservationDto } from "../../../../domain/dto/reservation/create/create-reservation.dto";
import { Reservation } from "../../../../domain/model/reservation";
import { setRoomList, updateRoomInList } from "../../../../infra/store/ngrx/actions/room.actions";
import { generateRandomReservations } from "../../../../infra/utils/generators/random-reservation";
import { ROOMS } from "../../../../domain/mock/rooms.mock";
import { AppState } from "../../../../infra/store/ngrx/state/app.state";
import { Room } from "../../../../domain/model/room";
import { setCheckoutList, setReservationList } from "../../../../infra/store/ngrx/actions/reservation.actions";
import { formatDate } from "@angular/common";
import { RoomStatus } from "../../../../domain/enum/room-status.enum";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(
        private store: Store<AppState>
    ) {
    }

    getReservations() {
        const roomList = generateRandomReservations(new Date().getMonth() + 1, ROOMS.length);
        const checkoutList = this.filterCheckoutList(roomList);
        const reservationList = this.filterReservationList(roomList);

        this.store.dispatch(setRoomList({ roomList: roomList }));
        this.store.dispatch(setCheckoutList({ checkoutList: checkoutList }));
        this.store.dispatch(setReservationList({ reservationList: reservationList }));

    }

    async add(createReservationDto: CreateReservationDto) {
        console.log('add', createReservationDto)
    }

    async edit(reservationDto: Reservation) {
        console.log('edit', reservationDto)
    }

    async delete(reservationDto: Reservation) {
        console.log('delete', reservationDto)
    }

    async checkin(checkinDto: Reservation) {
        console.log('checkin', checkinDto)
    }

    async checkout(checkoutDto: Reservation) {
        console.log('checkout', checkoutDto)
    }

    filterCheckoutList(roomList: Room[]): Reservation[] {
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
        return roomList
            .flatMap((room: Room) =>
                room.reservations?.filter((reservation: Reservation) => {
                    const checkOut = formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR');
                    return today === checkOut;
                }) || []
            );
    }

    filterReservationList(roomList: Room[]): Reservation[] {
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
        return roomList
            .flatMap((room: Room) =>
                room.reservations?.filter((reservation: Reservation) => {
                    const checkIn = formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
                    return today === checkIn;
                }) || []
            );
    }



}
