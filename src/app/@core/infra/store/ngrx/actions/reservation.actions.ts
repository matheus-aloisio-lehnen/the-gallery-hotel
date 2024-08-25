import { createAction, props } from '@ngrx/store';
import { Reservation } from "../../../../domain/interface/reservation.interface";

export const createReservation = createAction(
    '[Reservation] Create Reservation',
    props<{ reservation: Reservation }>()
);

export const updateReservation = createAction(
    '[Reservation] Update Reservation',
    props<{ reservation: Reservation }>()
);

export const deleteReservation = createAction(
    '[Reservation] Delete Reservation'
);

export const getReservation = createAction(
    '[Reservation] Get Reservation'
);

export const setReservation = createAction(
    '[Reservation] Set Reservation',
    props<{ reservation: Reservation | null }>()
);

export const addReservationToList = createAction(
    '[Reservation] Add Reservation to List',
    props<{ reservationList: Reservation[] }>()
);

export const updateReservationInList = createAction(
    '[Reservation] Update Reservation in List',
    props<{ reservation: Reservation }>()
);

export const removeReservationFromList = createAction(
    '[Reservation] Remove Reservation from List',
    props<{ id: number }>()
);

export const setReservationList = createAction(
    '[Reservation] Set Reservation List',
    props<{ reservationList: Reservation[] }>()
);
