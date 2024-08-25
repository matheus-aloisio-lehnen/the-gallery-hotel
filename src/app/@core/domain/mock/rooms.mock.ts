import { RoomStatus } from "../enum/room-status.enum";
import { Room } from "../interface/room.interface";

export const roomsMock: Room[] = [
    {
        id: 1,
        status: RoomStatus.busy,
        price: 150,
        reservations: [],
        dailyStatus: []
    },
    {
        id: 2,
        status: RoomStatus.free,
        price: 150,
        reservations: [],
        dailyStatus: []
    },
    {
        id: 3,
        status: RoomStatus.reserved,
        price: 150,
        reservations: [],
        dailyStatus: []
    },
    {
        id: 4,
        status: RoomStatus.busy,
        price: 250,
        reservations: [],
        dailyStatus: []
    },
    {
        id: 5,
        status: RoomStatus.free,
        price: 250,
        reservations: [],
        dailyStatus: []
    },
    {
        id: 6,
        status: RoomStatus.reserved,
        price: 250,
        reservations: [],
        dailyStatus: []
    },
]
