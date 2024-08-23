import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";
import { DatePipe, formatDate, TitleCasePipe } from "@angular/common";
import { LetDirective } from "@ngrx/component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { MONTHS } from "../../../domain/constants/months.constants";
import { MonthType } from "../../../domain/type/month.type";
import { ROOMS } from "../../../domain/mock/rooms.mock";
import { Room } from "../../../domain/model/room";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Reservation } from "../../../domain/model/reservation";
import { generateColor } from "../../../infra/utils/colors/color-generator";
import { AddReservationComponent } from "./dialogs/add-reservation/add-reservation.component";
import { DeleteReservationComponent } from "./dialogs/delete-reservation/delete-reservation.component";
import { setRoom, setRoomList } from "../../../infra/store/ngrx/actions/room.actions";
import { setReservation } from "../../../infra/store/ngrx/actions/reservation.actions";
import { EditReservationComponent } from "./dialogs/edit-reservation/edit-reservation.component";
import { generateRandomReservations } from "../../../infra/utils/generators/random-reservation";

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
        DatePipe
    ]
})
export class ReservationsComponent implements OnDestroy {

    @ViewChild(MatTabGroup) tabs!: MatTabGroup;
    protected readonly months: MonthType[];
    selectedMonth: number;
    displayedColumns: string[];

    today: string;

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.months = MONTHS;
        this.selectedMonth = new Date().getMonth();
        this.displayedColumns = this.getDisplayedColumns(this.selectedMonth + 1);
        this.store.dispatch(setRoom({ room: null}))
        this.today = formatDate(new Date(), 'dd', 'pt-BR');
    }

    onTabChange() {
        const month = this.selectedMonth + 1;
        this.store.dispatch(setRoomList({ roomList: generateRandomReservations(month, ROOMS.length) }))
        this.displayedColumns = this.getDisplayedColumns(month);
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

    getTableText(column: string, room: Room) {
        if (column === 'room') return room.number;
        return this.isStartDate(column, room) || this.isEndDate(column, room) ? this.findReservation(column, room)?.guest?.personalData?.name : '';
    }

    showDetails(column: string, room: Room) {
        this.store.dispatch(setRoom({ room: room }));
        this.store.dispatch(setReservation( { reservation: this.findReservation(column, room)}))
    }

    findReservation(column: string, room: Room) {
        const selectedDate = new Date(new Date().getFullYear(), this.selectedMonth, Number(column));
        return room.reservations?.find(reservation => selectedDate >= reservation.startDate && selectedDate <= reservation.endDate) ?? null;
    }

    hasReservation(column: string, element: Room) {
        if (column === 'room') return false;
        return this.findReservation(column, element)
    }

    isStartDate(column: string, room: Room) {
        if (column === 'room') return false;
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(column)), 'yyyy-MM-dd', 'pt-BR');
        const reservation = this.findReservation(column, room);
        if(!reservation) return false;
        return selectedDate === formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR');
    }

    isEndDate(column: string, room: Room) {
        if (column === 'room') return false;

        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(column)), 'yyyy-MM-dd', 'pt-BR');
        const reservation = this.findReservation(column, room);
        if(!reservation) return false;
        return selectedDate === formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR');
    }

    getColor(column: string, room: Room) {
        const guestName = this.findReservation(column, room)?.guest?.personalData?.name;

        if (!guestName) return;
        return generateColor(guestName)
    }

    add() {
        this.dialog.open(AddReservationComponent);
    }

    edit(reservation: Reservation) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = reservation;
        this.dialog.open(EditReservationComponent, dialogConfig)
    }

    delete(reservation: Reservation) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = reservation;
        this.dialog.open(DeleteReservationComponent, dialogConfig);
    }

    ngOnDestroy() {
        this.store.dispatch(setReservation( { reservation: null }));
    }

}
