import { createAction, props } from '@ngrx/store';
import { Room } from "../../../../domain/interface/room.interface";

export const selectRoom = createAction(
    '[Room] Select Room',
    props<{ id: number }>()
);

export const deselectRoom = createAction('[Room] Deselect Room',);

export const addRoomsToList = createAction(
    '[Room] Add rooms to List',
    props<{ roomList: Room[] }>()
);

export const clearRooms = createAction('[Room] Clear Companies');

export const addRoom = createAction(
    '[Item] Add Room',
    props<{ room: Room }>()
);

export const updateRoom = createAction(
    '[Room] Update Room',
    props<{ room: Room }>()
)

export const deleteRoom = createAction(
    '[Room] Delete Room',
    props<{ id: number }>()
);