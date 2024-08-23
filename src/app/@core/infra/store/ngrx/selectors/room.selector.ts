import { createSelector } from '@ngrx/store';
import { AppState } from "../state/app.state";
import { RoomState } from "../state/room.state";

export const selectRoom = createSelector(
    (state: AppState) => state.room,
    (roomState: RoomState) => roomState.room
);

export const selectRoomList = createSelector(
    (state: AppState) => state.room,
    (roomState: RoomState) => roomState.roomList
);
