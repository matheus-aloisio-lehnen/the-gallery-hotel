import { createAction, props } from '@ngrx/store';
import { Reservation } from "../../../../domain/model/reservation";

export const createReservation = createAction(
    '[Reservation] Create Reservation',
    props<{ reservation: Reservation }>()
);

export const updateReservation = createAction(
    '[Reservation] Update Reservation',
    props<{ reservation: Reservation }>()
);

export const deleteReservation = createAction(
    '[Reservation] Delete Reservation'
);

export const getReservation = createAction(
    '[Reservation] Get Reservation'
);

export const setReservation = createAction(
    '[Reservation] Set Reservation',
    props<{ reservation: Reservation | null }>()
);

export const addReservationToList = createAction(
    '[Reservation] Add Reservation to List',
    props<{ reservation: Reservation }>()
);

export const updateReservationInList = createAction(
    '[Reservation] Update Reservation in List',
    props<{ reservation: Reservation }>()
);

export const removeReservationFromList = createAction(
    '[Reservation] Remove Reservation from List',
    props<{ id: number }>()
);

export const setReservationList = createAction(
    '[Reservation] Set Reservation List',
    props<{ reservationList: Reservation[] }>()
);

export const createCheckout = createAction(
    '[Checkout] Create Checkout',
    props<{ checkout: Reservation }>()
);

export const updateCheckout = createAction(
    '[Checkout] Update Checkout',
    props<{ checkout: Reservation }>()
);

export const deleteCheckout = createAction(
    '[Checkout] Delete Checkout'
);

export const getCheckout = createAction(
    '[Checkout] Get Checkout'
);

export const setCheckout = createAction(
    '[Checkout] Set Checkout',
    props<{ checkout: Reservation | null }>()
);

export const addCheckoutToList = createAction(
    '[Checkout] Add Checkout to List',
    props<{ checkout: Reservation }>()
);

export const updateCheckoutInList = createAction(
    '[Checkout] Update Checkout in List',
    props<{ checkout: Reservation }>()
);

export const removeCheckoutFromList = createAction(
    '[Checkout] Remove Checkout from List',
    props<{ id: number }>()
);

export const setCheckoutList = createAction(
    '[Checkout] Set Checkout List',
    props<{ checkoutList: Reservation[] }>()
);
