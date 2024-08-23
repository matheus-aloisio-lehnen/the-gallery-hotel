import { createAction, props } from '@ngrx/store';
import { Room } from "../../../../domain/model/room";

export const createRoom = createAction(
    '[Room] Create Room',
    props<{ room: Room }>()
);

export const updateRoom = createAction(
    '[Room] Update Room',
    props<{ room: Room }>()
);

export const deleteRoom = createAction(
    '[Room] Delete Room'
);

export const setRoom = createAction(
    '[Room] Set Room',
    props<{ room: Room | null }>()
);

export const addRoomToList = createAction(
    '[Room] Add Room to List',
    props<{ room: Room }>()
);

export const updateRoomInList = createAction(
    '[Room] Update Room in List',
    props<{ room: Room }>()
);

export const removeRoomFromList = createAction(
    '[Room] Remove Room from List',
    props<{ id: number }>()
);

export const setRoomList = createAction(
    '[Room] Set Room List',
    props<{ roomList: Room[] }>()
);
