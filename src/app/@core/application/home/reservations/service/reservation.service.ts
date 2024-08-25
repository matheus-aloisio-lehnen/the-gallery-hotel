import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { CreateReservationDto } from "../../../../domain/dto/reservation/create/create-reservation.dto";
import { formatDate } from "@angular/common";
import { Reservation } from "../../../../domain/interface/reservation.interface";
import { Room } from "../../../../domain/interface/room.interface";
import { AppState } from "../../../../domain/type/app-state.type";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(
        private store: Store<AppState>
    ) {
    }

    getReservations() {
        // const roomList = generateRandomReservations(new Date().getMonth() + 1, ROOMS.length);
        // const checkoutList = this.filterCheckoutList(roomList);
        // const reservationList = this.filterReservationList(roomList);
        //
        // this.store.dispatch(setRoomList({ roomList: roomList }));
        // this.store.dispatch(setCheckoutList({ checkoutList: checkoutList }));
        // this.store.dispatch(setReservationList({ reservationList: reservationList }));

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
