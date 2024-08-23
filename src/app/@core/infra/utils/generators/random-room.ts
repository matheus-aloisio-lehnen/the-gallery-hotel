import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { Room } from "../../../domain/model/room";

export const generateRandomRooms = (roomsQuantity: number): Room[] => {
    return Array.from({ length: roomsQuantity }, (_, i) => ({
        number: i + 1,
        status: RoomStatus.busy,
        price: 250,
        reservations: []
    }));
}