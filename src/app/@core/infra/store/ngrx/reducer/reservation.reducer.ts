import { ActionReducer, createReducer, on } from '@ngrx/store';
import {
    addCheckoutToList,
    addReservationToList, createCheckout,
    createReservation, deleteCheckout,
    deleteReservation, removeCheckoutFromList, removeReservationFromList, setCheckout, setCheckoutList,
    setReservation,
    setReservationList, updateCheckout, updateCheckoutInList,
    updateReservation, updateReservationInList
} from "../actions/reservation.actions";
import { initialReservationState, ReservationState } from "../state/reservation.state";
import { Reservation } from "../../../../domain/model/reservation";

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
    on(addReservationToList, (state, { reservation }) => ({
        ...state,
        reservationList: [...state.reservationList, reservation]
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

    on(createCheckout, (state, { checkout }) => ({
        ...state,
        checkout
    })),
    on(updateCheckout, (state, { checkout }) => ({
        ...state,
        checkout
    })),
    on(deleteCheckout, (state) => ({
        ...state,
        checkout: null
    })),
    on(setCheckout, (state, { checkout }) => ({
        ...state,
        checkout
    })),
    on(addCheckoutToList, (state, { checkout }) => ({
        ...state,
        checkoutList: [...state.checkoutList, checkout]
    })),
    on(updateCheckoutInList, (state, { checkout }) => ({
        ...state,
        checkoutList: state.checkoutList.map((c: Reservation) =>
            c.id === checkout.id ? { ...c, ...checkout } : c
        )
    })),
    on(removeCheckoutFromList, (state, { id }) => ({
        ...state,
        checkoutList: state.checkoutList.filter((c: Reservation) => c.id !== id)
    })),

    on(setCheckoutList, (state, { checkoutList }) => ({
        ...state,
        checkoutList
    })),

);
