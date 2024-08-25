import { Reservation } from "../interface/reservation.interface";

export type ReservationState = {
    selectedReservation: Reservation | null;
    reservationList: Reservation[];
}
