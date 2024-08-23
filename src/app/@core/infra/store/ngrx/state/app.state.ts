import { UserState } from "./user.state";
import { LoadingState } from "./loading.state";
import { RoomState } from "./room.state";
import { ReservationState } from "./reservation.state";

export interface AppState {
    isDarkMode: boolean;
    loading: LoadingState;
    user: UserState,
    room: RoomState,
    reservation: ReservationState
}
