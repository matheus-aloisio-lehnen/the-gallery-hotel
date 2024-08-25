import { Room } from "../interface/room.interface";

export type RoomState = {
    selectedRoom: Room | null;
    roomList: Room[];
}
