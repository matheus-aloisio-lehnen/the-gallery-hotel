import { AppState } from "../../../../domain/type/app-state.type";
import { createSelector } from "@ngrx/store";
import { RoomState } from "../../../../domain/type/room-state.type";

export const selectRoomState = (state: AppState) => state.roomState;

export const selectSelectedRoom = createSelector(
    selectRoomState,
    (state: RoomState) => state.selectedRoom
);

export const selectAllRooms = createSelector(
    selectRoomState,
    (state: RoomState) => state.roomList
);

export const hasRooms = createSelector(
    selectAllRooms,
    (roomList) => roomList.length > 0
);