import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Reservation } from "../../../../domain/interface/reservation.interface";
import {
    addReservationToList,
    createReservation,
    deleteReservation, removeReservationFromList,
    setReservation, setReservationList,
    updateReservation, updateReservationInList
} from "../actions/reservation.actions";
import { ReservationState } from "../../../../domain/type/reservation-state.type";
import { addStaffsToList } from "../actions/staff.actions";


const initialReservationState: ReservationState = {
    selectedReservation: null,
    reservationList: [],
};

export const reservationReducer: ActionReducer<ReservationState> = createReducer(
    initialReservationState,
    on(createReservation, (state, { reservation }) => ({
        ...state,
        reservation
    })),
    on(updateReservation, (state, { reservation }) => ({
        ...state,
        reservation
    })),
    on(deleteReservation, (state) => ({
        ...state,
        reservation: null
    })),
    on(setReservation, (state, { reservation }) => ({
        ...state,
        reservation
    })),
    on(addReservationToList, (state, { reservationList }) => ({
        ...state,
        reservationList
    })),
    on(updateReservationInList, (state, { reservation }) => ({
        ...state,
        reservationList: state.reservationList.map((r: Reservation) =>
            r.id === reservation.id ? { ...r, ...reservation } : r
        )
    })),
    on(removeReservationFromList, (state, { id }) => ({
        ...state,
        reservationList: state.reservationList.filter((r: Reservation) => r.id !== id)
    })),
    on(setReservationList, (state, { reservationList }) => ({
        ...state,
        reservationList
    })),
);
