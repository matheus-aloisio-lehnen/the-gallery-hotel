import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service";
import { Store } from "@ngrx/store";

import { addSummaryCard } from "../../../store/ngrx/actions/summary-card.action";
import { DashContract } from "../../../../domain/type/dash-contract.type";
import { addRoomsToList } from "../../../store/ngrx/actions/room.actions";
import { Reservation } from "../../../../domain/interface/reservation.interface";

@Injectable({
    providedIn: 'root'
})
export class DashService {

    constructor(
        private http: HttpService,
        private store: Store,
    ) {
    }

    loadData(): void {
        this.http.loadDashData()
            .subscribe((data: DashContract) => {
                this.store.dispatch(addSummaryCard({ summaryCard: data.summaryCard }))
                this.store.dispatch(addRoomsToList({ roomList: data.roomList }))
            })
    }

    checkout(id: number) {
        return this.http.checkout(id);

    }

    async checkin(reservation: Reservation) {
        return this.http.checkin(reservation)
    }

}
