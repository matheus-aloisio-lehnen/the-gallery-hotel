import { Room } from "../../../../domain/model/room";

export const initialRoomState: RoomState = {
    room: null,
    roomList: []
};

export interface RoomState {
    room: Room | null;
    roomList: Room[]
}
