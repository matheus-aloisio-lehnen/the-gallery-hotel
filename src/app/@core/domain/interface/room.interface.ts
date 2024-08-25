import { RoomStatus } from "../enum/room-status.enum";
import { Reservation } from "./reservation.interface";

export interface Room {
    id?: number
    status: RoomStatus,
    price: number,
    description?: string,
    reservations?: Reservation[],
    dailyStatus: string[]
}
