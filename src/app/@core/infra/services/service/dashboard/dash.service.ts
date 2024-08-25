import { Injectable } from '@angular/core';
import { HttpService } from "../../http/http.service";
import { Store } from "@ngrx/store";

import { addSummaryCard } from "../../../store/ngrx/actions/summary-card.action";
import { DashContract } from "../../../../domain/type/dash-contract.type";
import { addRoomsToList } from "../../../store/ngrx/actions/room.actions";

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
                console.log('data', data);
                this.store.dispatch(addSummaryCard({ summaryCard: data.summaryCard }))
                this.store.dispatch(addRoomsToList({ roomList: data.roomList }))
            })
    }

}
