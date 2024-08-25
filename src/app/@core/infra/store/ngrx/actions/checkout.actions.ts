import { createAction, props } from '@ngrx/store';
import { Reservation } from "../../../../domain/interface/reservation.interface";

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
    props<{ checkoutList: Reservation[] }>()
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
