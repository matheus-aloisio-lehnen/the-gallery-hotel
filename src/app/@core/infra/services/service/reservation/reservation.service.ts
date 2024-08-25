import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service";
import { Store } from "@ngrx/store";

import { CreateReservationDto } from "../../../../domain/dto/reservation/create/create-reservation.dto";
import { addRoomsToList } from "../../../store/ngrx/actions/room.actions";
import { Room } from "../../../../domain/interface/room.interface";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(
        private http: HttpService,
        private store: Store,
    ) {
    }

    getAllByMonth(month: number) {
        return this.http.getAllReservationsByMonth(month)
            .subscribe((data: Room[]) => this.store.dispatch(addRoomsToList({ roomList: data })))
    }

    add(createReservationDto: CreateReservationDto) {
        return this.http.addReservation(createReservationDto);
    }

    delete(id: number) {
        return this.http.deleteReservation(id)
            .subscribe((isDeleted: boolean) => {
                if(!isDeleted) return;
                const month = new Date().getMonth() + 1;
                this.getAllByMonth(month)
            })
    }

    async isRoomAvailable(queryParams: string) {
        return this.http.isRoomAvailable(queryParams);
    }
}
