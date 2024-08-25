import {
    ActionReducerMap,
    MetaReducer,
} from '@ngrx/store';
import { environment } from "../../../../../../environments/environment";

import { darkModeReducer } from "./dark-mode-reducer";
import { loadingReducer } from "./loading.reducer";
import { staffReducer } from "./staff.reducer";
import { AppState } from "../../../../domain/type/app-state.type";
import { reservationReducer } from "./reservation.reducer";
import { roomReducer } from "./room.reducer";
import { checkoutReducer } from "./checkout.reducer";
import { summaryCardReducer } from "./summary-card.reducer";


export const reducers: ActionReducerMap<AppState> = {
    isDarkMode: darkModeReducer,
    loading: loadingReducer,
    staffState: staffReducer,
    roomState: roomReducer,
    reservationState: reservationReducer,
    checkoutState: checkoutReducer,
    summaryCardState: summaryCardReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
