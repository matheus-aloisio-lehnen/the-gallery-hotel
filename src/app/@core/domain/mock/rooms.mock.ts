import { Room } from "../model/room";
import { RoomStatus } from "../enum/room-status.enum";

export const ROOMS: Room[] = [
    {
        number: 1,
        status: RoomStatus.busy,
        price: 150,
        reservations: []
    },
    {
        number: 2,
        status: RoomStatus.free,
        price: 150,
        reservations: []
    },
    {
        number: 3,
        status: RoomStatus.reserved,
        price: 150,
        reservations: []
    },
    {
        number: 4,
        status: RoomStatus.busy,
        price: 250,
        reservations: []
    },
    {
        number: 5,
        status: RoomStatus.free,
        price: 250,
        reservations: []
    },
    {
        number: 6,
        status: RoomStatus.reserved,
        price: 250,
        reservations: []
    },
    // {
    //     number: 7,
    //     status: RoomStatus.reserved,
    //     price: 250,
    //     reservations: []
    // },
    // {
    //     number: 8,
    //     status: RoomStatus.reserved,
    //     price: 250,
    //     reservations: []
    // },
    // {
    //     number: 9,
    //     status: RoomStatus.reserved,
    //     price: 250,
    //     reservations: []
    // },
    // {
    //     number: 10,
    //     status: RoomStatus.reserved,
    //     price: 250,
    //     reservations: []
    // }
]
