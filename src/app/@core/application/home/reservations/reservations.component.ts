import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";
import { AsyncPipe, DatePipe, formatDate, TitleCasePipe } from "@angular/common";
import { LetDirective } from "@ngrx/component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatFormFieldModule, } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { NgxMaskDirective } from "ngx-mask";

import { MONTHS } from "../../../domain/constants/months.constants";
import { MonthType } from "../../../domain/type/month.type";
import { generateColor } from "../../../infra/utils/colors/color-generator";
import { AddReservationComponent } from "./dialogs/add-reservation/add-reservation.component";
import { DeleteReservationComponent } from "./dialogs/delete-reservation/delete-reservation.component";
import { Room } from "../../../domain/interface/room.interface";
import { Reservation } from "../../../domain/interface/reservation.interface";
import { AppState } from "../../../domain/type/app-state.type";
import { BaseComponent } from "../../shared/base/base.component";
import { ReservationService } from "../../../infra/services/service/reservation/reservation.service";
import { Loading } from "../../../domain/enum/loading.enum";
import { hasRooms, selectAllRooms, selectSelectedRoom } from "../../../infra/store/ngrx/selectors/room.selector";
import { RoomService } from "../../../infra/services/service/room/room.service";
import { selectRoom } from "../../../infra/store/ngrx/actions/room.actions";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        LetDirective,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        TitleCasePipe,
        DatePipe,
        MatProgressSpinner,
        CurrencyMaskModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        NgxMaskDirective,
        AsyncPipe
    ]
})
export class ReservationsComponent extends BaseComponent implements OnInit {


    loading$: Observable<boolean>;
    @ViewChild(MatTabGroup) tabs!: MatTabGroup;
    protected readonly months: MonthType[];
    selectedMonth: number;
    displayedColumns: string[];
    today: string;
    roomList$: Observable<Room[]>;
    selectedReservation?: Reservation | null;

    constructor(
        store: Store<AppState>,
        router: Router,
        private dialog: MatDialog,
        private reservationService: ReservationService,
    ) {
        super(store, router);
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.getAllRooms] || appState.loading[Loading.addRoom] || appState.loading[Loading.deleteRoom]);
        this.roomList$ = this.store.select(selectAllRooms);
        this.months = MONTHS;
        this.selectedMonth = new Date().getMonth();
        this.displayedColumns = this.getDisplayedColumns(this.selectedMonth + 1);
        this.today = formatDate(new Date(), 'dd', 'pt-BR');
    }

    ngOnInit() {
        this.reservationService.getAllByMonth(this.selectedMonth + 1);
    }

    getDisplayedColumns(month: number): any[] {
        const columns = [ 'room' ];
        const numDays = new Date(new Date().getFullYear(), month, 0).getDate();
        for (let day = 1; day <= numDays; day++) {
            const formattedDay = day.toString().padStart(2, '0');
            columns.push(formattedDay);
        }

        return columns;
    }

    onTabChange() {
        const month = this.selectedMonth + 1;
        this.displayedColumns = this.getDisplayedColumns(month);
        this.reservationService.getAllByMonth(month);
    }

    getGuestName(column: string, room: Room, hasReservation: boolean) {
        if (column === 'room') return room.id;
        if(!hasReservation) return '';
        const reservation = this.findReservation(column, room);
        return reservation?.user?.personalData?.name;
    }

    showDetails(day: string, room: Room) {
        this.selectedReservation = this.findReservation(day, room);
    }

    findReservation(day: string, room: Room) {
        const selectedDate = new Date(new Date().getFullYear(), this.selectedMonth, Number(day));
        const selectedDateStr = formatDate(selectedDate, 'yyyy-MM-dd', 'pt-BR');
        return room.reservations?.find(reservation => selectedDateStr >= reservation.startDate && selectedDateStr <= reservation.endDate) ?? null;
    }

    isStartDate(day: string, room: Room) {
        if (day === 'room') return false;
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(day)), 'yyyy-MM-dd', 'pt-BR');
        const reservation = this.findReservation(day, room);
        if(!reservation) return false;
        return selectedDate === formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
    }

    isEndDate(day: string, room: Room) {
        if (day === 'room') return false;
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(day)), 'yyyy-MM-dd', 'pt-BR');
        const reservation = this.findReservation(day, room);
        if(!reservation) return false;
        return selectedDate === formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR');
    }

    getColor(day: string, room: Room) {
        if (day === 'room') return;
        const guestName = this.findReservation(day, room)?.user?.personalData?.name;
        if (!guestName) return;
        return generateColor(guestName)
    }

    add() {
        this.dialog.open(AddReservationComponent)
    }

    delete() {
        if(!this.selectedReservation || !this.selectedReservation.id) return;
        this.reservationService.delete(this.selectedReservation.id);
        this.selectedReservation = undefined;
    }

}
