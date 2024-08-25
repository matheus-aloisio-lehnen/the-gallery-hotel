import { AppState } from "../../../../domain/type/app-state.type";
import { createSelector } from "@ngrx/store";
import { ReservationState } from "../../../../domain/type/reservation-state.type";

export const selectReservationState = (state: AppState) => state.reservationState;

export const selectSelectedReservation = createSelector(
    selectReservationState,
    (state: ReservationState) => state.selectedReservation
);

export const selectAllReservations = createSelector(
    selectReservationState,
    (state: ReservationState) => state.reservationList
);

export const hasReservations = createSelector(
    selectAllReservations,
    (staffList) => staffList.length > 0
);