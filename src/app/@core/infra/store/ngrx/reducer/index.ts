import {
    ActionReducerMap,
    MetaReducer,
} from '@ngrx/store';
import { environment } from "../../../../../../environments/environment";

import { darkModeReducer } from "./dark-mode-reducer";
import { loadingReducer } from "./loading.reducer";
import { AppState } from "../state/app.state";
import { userReducer } from "./user.reducer";
import { roomReducer } from "./room.reducer";
import { reservationReducer } from "./reservation.reducer";


export const reducers: ActionReducerMap<AppState> = {
    isDarkMode: darkModeReducer,
    loading: loadingReducer,
    user: userReducer,
    room: roomReducer,
    reservation: reservationReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
