import { Guest } from "./guest.interface";
import { Room } from "./room.interface";

export interface Reservation {
    id?: number,
    user: Guest,
    startDate: Date | string,
    endDate: Date | string,
    room: Room,
    qrCode: string,
    qrCodeStatus: boolean,
    checkedOut: boolean
}