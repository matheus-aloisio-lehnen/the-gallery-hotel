import { LoadingState } from "./loading-state.type";
import { StaffState } from "./staff-state.type";
import { RoomState } from "./room-state.type";
import { ReservationState } from "./reservation-state.type";
import { CheckoutState } from "./checkout-state.type";
import { SummaryCardState } from "./summary-card-state.type";

export type AppState = {
    isDarkMode: boolean;
    loading: LoadingState;
    staffState: StaffState;
    roomState: RoomState;
    reservationState: ReservationState;
    checkoutState: CheckoutState;
    summaryCardState: SummaryCardState
}
