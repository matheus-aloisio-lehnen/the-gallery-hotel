import { Guest } from "../../../domain/model/guest";
import { Room } from "../../../domain/model/room";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { formatDate } from "@angular/common";
import { PaymentStatus } from "../../../domain/enum/payment-status.enum";
import { Reservation } from "../../../domain/model/reservation";
import { generateRandomGuests, getRandomGuest } from "./random-guests";
import { generateRandomRooms } from "./random-room";
import { getRandomInt } from "./random-int";

const checkRoomStatusByDate = (reservations: Reservation[], date: Date): RoomStatus => {
    const dateToCheck = formatDate(date, 'yyyy-MM-dd', 'pt-BR');
    const isBusy = reservations.some((reservation: Reservation) => {
        const checkIn = formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
        const checkOut = formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR');
        return checkIn < dateToCheck && checkOut >= dateToCheck;
    });

    const isReserved = reservations.some((reservation: Reservation) => {
        const checkIn = formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
        return checkIn === dateToCheck && !isBusy;
    });

    return isBusy
        ? RoomStatus.busy
        : isReserved
            ? RoomStatus.reserved
            : RoomStatus.free
}

export const generateRandomReservations = (month: number, roomsQuantity: number) => {
    const guests: Guest[] = generateRandomGuests();
    const rooms: Room[] = generateRandomRooms(roomsQuantity)

    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    rooms.forEach(room => {
        let count = 0;
        let day = 1;

        while (day <= daysInMonth) {
            const reservationChance = 0.7;
            const shouldGenerateReservation = Math.random() >= reservationChance;

            if (shouldGenerateReservation) {
                const stayLength = getRandomInt(2, 3);

                if (day + stayLength - 1 > daysInMonth) {
                    break;
                }

                const guest = getRandomGuest(guests)
                const startDate = new Date(new Date().getFullYear(), month - 1, day);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + stayLength - 1);
                const startDateFormatted = formatDate(startDate, 'yyyy-MM-dd', 'pt-BR');
                const endDateFormatted = formatDate(endDate, 'yyyy-MM-dd', 'pt-BR');
                const canAddReservation = room.reservations?.every(existingReservation => {
                    const existingStartDateFormatted = formatDate(existingReservation.startDate, 'yyyy-MM-dd', 'pt-BR');
                    const existingEndDateFormatted = formatDate(existingReservation.endDate, 'yyyy-MM-dd', 'pt-BR');
                    return endDateFormatted <= existingStartDateFormatted || startDateFormatted >= existingEndDateFormatted;
                });

                if (canAddReservation) {
                    room.reservations?.push({
                        guest: guest,
                        startDate: startDate,
                        endDate: endDate,
                        roomNumber: room.number,
                        paymentStatus: PaymentStatus.paid
                    });

                }
                count++;
                if (count > 1) {
                    day += stayLength;
                }
            } else {
                day++;
            }
        }
        room.status = checkRoomStatusByDate(room.reservations || [], new Date());
    })

    return rooms;
}

