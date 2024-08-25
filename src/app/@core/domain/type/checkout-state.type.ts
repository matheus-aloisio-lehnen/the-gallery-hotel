import { Reservation } from "../interface/reservation.interface";

export type CheckoutState = {
    selectedCheckout: Reservation | null;
    checkoutList: Reservation[];
}
