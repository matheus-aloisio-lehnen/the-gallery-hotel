import { RoomState } from "../../../../domain/type/room-state.type";
import { createReducer, on } from "@ngrx/store";
import { addRoom, addRoomsToList, clearRooms, deselectRoom, selectRoom, updateRoom } from "../actions/room.actions";
import { Room } from "../../../../domain/interface/room.interface";

const initialRoomState: RoomState = {
    selectedRoom: null,
    roomList: [],
};

export let roomReducer: any;
roomReducer = createReducer(
    initialRoomState,
    on(addRoomsToList, (state, { roomList }) => ({
        ...state,
        roomList
    })),
    on(clearRooms, state => ({
        ...state,
        roomList: []
    })),
    on(selectRoom, (state, { id }) => {
        const selectedRoom = state.roomList.find((room: Room) => room.id === id) || null;
        return {
            ...state,
            selectedRoom
        }
    }),
    on(deselectRoom, state => ({
        ...state,
        selectedRoom: null
    })),
    on(addRoom, (state, { room }) => ({
        ...state,
        roomList: [ ...state.roomList, room ]
    })),
    on(updateRoom, (state, { room }) => ({
        ...state,
        roomList: state.roomList.map(c => c.id === room.id ? room : c)
    }))
);