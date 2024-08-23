import { Guest } from "./guest";
import { PaymentStatus } from "../enum/payment-status.enum";

export interface Reservation {
    id?: number,
    guest: Guest,
    startDate: Date,
    endDate: Date,
    roomNumber: number,
    paymentStatus: PaymentStatus,
}