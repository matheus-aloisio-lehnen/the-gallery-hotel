import { AppState } from "../../../../domain/type/app-state.type";
import { createSelector } from "@ngrx/store";
import { CheckoutState } from "../../../../domain/type/checkout-state.type";

export const selectCheckoutState = (state: AppState) => state.checkoutState;

export const selectSelectedCheckout = createSelector(
    selectCheckoutState,
    (state: CheckoutState) => state.selectedCheckout
);

export const selectAllCheckouts = createSelector(
    selectCheckoutState,
    (state: CheckoutState) => state.checkoutList
);

export const hasCheckouts = createSelector(
    selectAllCheckouts,
    (staffList) => staffList.length > 0
);