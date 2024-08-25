import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { AsyncPipe, CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";
import { firstValueFrom, Observable } from "rxjs";
import { MatRipple } from "@angular/material/core";
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";

import { AppState } from "../../../domain/type/app-state.type";
import { BaseComponent } from "../../shared/base/base.component";
import { DashService } from "../../../infra/services/service/dashboard/dash.service";
import { SummaryCard } from "../../../domain/type/summary-card.type";
import { selectSummaryCard } from "../../../infra/store/ngrx/selectors/summary-card.selector";
import { Room } from "../../../domain/interface/room.interface";
import { selectAllRooms } from "../../../infra/store/ngrx/selectors/room.selector";
import { addRoomsToList } from "../../../infra/store/ngrx/actions/room.actions";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { CpfPipe } from "../../../infra/utils/pipes/cpf.pipe";
import { AddReservationComponent } from "../reservations/dialogs/add-reservation/add-reservation.component";
import { Loading } from "../../../domain/enum/loading.enum";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        LetDirective,
        MatButtonModule,
        RouterLink,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NgxMaskDirective,
        DatePipe,
        TitleCasePipe,
        AsyncPipe,
        MatRipple,
        RouterOutlet,
        CurrencyPipe,
        CpfPipe,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
})
export class DashComponent extends BaseComponent implements OnInit, OnDestroy {


    protected readonly RoomStatus = RoomStatus;
    summaryCard$: Observable<SummaryCard | null>;
    loading$: Observable<boolean>;
    roomList$: Observable<Room[]>;
    now: Date;
    selectedRoom?: Room;

    constructor(
        store: Store<AppState>,
        router: Router,
        private dialog: MatDialog,
        private dashService: DashService,
    ) {
        super(store, router);
        this.summaryCard$ = this.store.select(selectSummaryCard);
        this.roomList$ = this.store.select(selectAllRooms);
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.getDash] || appState.loading[Loading.checkin] || appState.loading[Loading.checkout]);
        this.now = new Date();
    }

    ngOnInit() {
        this.dashService.loadData();
    }

    checkout() {
        this.selectedRoom && this.selectedRoom.id && this.dashService.checkout(this.selectedRoom.id)
            .subscribe((hasSuccess: boolean) => {
                if(!hasSuccess) return;
                this.dashService.loadData();
                this.selectedRoom = undefined;
            })
    }

    async checkin() {
        if(!this.selectedRoom) return;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { context: 'checkin', room: this.selectedRoom };
        const hasReservation = !!this.selectedRoom.reservation;
        const reservation = hasReservation
            ? this.selectedRoom.reservation
            : await firstValueFrom(this.dialog.open(AddReservationComponent, dialogConfig).afterClosed());
        if(!reservation) return;
        await this.dashService.checkin(reservation);
        this.selectedRoom = undefined;
        this.dashService.loadData();
    }

    ngOnDestroy() {
        this.store.dispatch(addRoomsToList({ roomList: [] }))
    }

}
