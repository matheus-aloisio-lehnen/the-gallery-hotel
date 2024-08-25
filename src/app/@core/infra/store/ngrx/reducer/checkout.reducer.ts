import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Reservation } from "../../../../domain/interface/reservation.interface";
import { CheckoutState } from "../../../../domain/type/checkout-state.type";
import {
    addCheckoutToList,
    createCheckout,
    deleteCheckout, removeCheckoutFromList,
    setCheckout, setCheckoutList,
    updateCheckout, updateCheckoutInList
} from "../actions/checkout.actions";

const initialCheckoutState: CheckoutState = {
    selectedCheckout: null,
    checkoutList: [],
};

export const checkoutReducer: ActionReducer<CheckoutState> = createReducer(
    initialCheckoutState,
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
    on(addCheckoutToList, (state, { checkoutList }) => ({
        ...state,
        checkoutList
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
