import { Reservation } from "../../../../domain/model/reservation";

export const initialReservationState: ReservationState = {
    reservation: null,
    checkout: null,
    reservationList: [],
    checkoutList: [],
};

export interface ReservationState {
    reservation: Reservation | null;
    checkout: Reservation | null;
    reservationList: Reservation[];
    checkoutList: Reservation[];
}
