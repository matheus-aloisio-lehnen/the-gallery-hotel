import { ActionReducer, createReducer, on } from '@ngrx/store';
import { initialRoomState, RoomState } from "../state/room.state";
import {
    addRoomToList,
    createRoom,
    deleteRoom,
    removeRoomFromList,
    setRoom,
    setRoomList,
    updateRoom,
    updateRoomInList
} from "../actions/room.actions";
import { Room } from "../../../../domain/model/room";

export const roomReducer: ActionReducer<RoomState> = createReducer(
    initialRoomState,
    on(createRoom, (state, { room }) => ({
        ...state,
        room
    })),
    on(updateRoom, (state, { room }) => ({
        ...state,
        room
    })),
    on(deleteRoom, (state) => ({
        ...state,
        room: null
    })),
    on(setRoom, (state, { room }) => ({
        ...state,
        room
    })),
    on(addRoomToList, (state, { room }) => ({
        ...state,
        roomList: [ ...state.roomList, room ]
    })),
    on(updateRoomInList, (state, { room }) => ({
        ...state,
        roomList: state.roomList.map((r: Room) => r.number === room.number ? { ...r, ...room } : r)
    })),
    on(removeRoomFromList, (state, { id }) => ({
        ...state,
        roomList: state.roomList.filter((r: Room) => r.number !== id)
    })),
    on(setRoomList, (state, { roomList }) => ({
        ...state,
        roomList
    })),
);
