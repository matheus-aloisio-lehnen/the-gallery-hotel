import { createSelector } from '@ngrx/store';
import { AppState } from "../state/app.state";
import { ReservationState } from "../state/reservation.state";

export const selectReservation = createSelector(
    (state: AppState) => state.reservation,
    (reservationState: ReservationState) => reservationState.reservation
);

export const selectCheckout = createSelector(
    (state: AppState) => state.reservation,
    (reservationState: ReservationState) => reservationState.checkout
);

export const selectReservationList = createSelector(
    (state: AppState) => state.reservation,
    (reservationState: ReservationState) => reservationState.reservationList
);

export const selectCheckoutList = createSelector(
    (state: AppState) => state.reservation,
    (reservationState: ReservationState) => reservationState.checkoutList
);