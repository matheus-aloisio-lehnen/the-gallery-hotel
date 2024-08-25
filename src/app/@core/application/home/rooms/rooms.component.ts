import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule, } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { Observable } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule, } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatStepperModule, } from "@angular/material/stepper";
import { NgxMaskDirective } from "ngx-mask";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe, CurrencyPipe, TitleCasePipe } from "@angular/common";

import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { Room } from "../../../domain/interface/room.interface";
import { AppState } from "../../../domain/type/app-state.type";
import { selectAllRooms } from "../../../infra/store/ngrx/selectors/room.selector";
import { Icon } from "../../../domain/enum/icon.enum";
import { Loading } from "../../../domain/enum/loading.enum";
import { BaseComponent } from "../../shared/base/base.component";
import { RoomService } from "../../../infra/services/service/room/room.service";

import { RoomType } from "../../../domain/enum/room-type.enum";
import { addRoomsToList } from "../../../infra/store/ngrx/actions/room.actions";


@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [

    ],
    imports: [
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinner,
        LetDirective,
        TitleCasePipe,
        MatStepperModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMaskDirective,
        AsyncPipe,
        CurrencyMaskModule,
        CurrencyPipe,
    ],
})
export class RoomsComponent extends BaseComponent implements OnInit, OnDestroy {


    protected readonly Icon = Icon;
    protected readonly RoomType = RoomType;
    loading$: Observable<boolean>;
    showAddForm: boolean;
    displayedColumns: string[];
    roomList$: Observable<Room[]>;
    roomForm: FormGroup;

    constructor(
        store: Store<AppState>,
        router: Router,
        private _formBuilder: FormBuilder,
        private roomService: RoomService,
    ) {
        super(store, router);
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.getAllRooms] || appState.loading[Loading.addRoom] || appState.loading[Loading.deleteRoom]);
        this.roomList$ = this.store.select(selectAllRooms);
        this.showAddForm = false;
        this.displayedColumns = [ 'id', 'price', 'description', 'status', 'actions' ];
        this.roomForm = this._formBuilder.group({
            price: [''],
            description: ['']
        })
    }

    ngOnInit() {
        this.roomService.getAll();
    }

    add() {
        if (this.roomForm.invalid) {
            this.roomForm.markAllAsTouched();
            return;
        }
        this.roomService.add(this.roomForm.value)
            .subscribe((data: Room) => {
                if(!data.id) return;
                this.roomForm.reset();
                this.showAddForm = false;
                this.roomService.getAll();
            });
    }

    delete(id: number) {
        this.roomService.delete(id);
    }

    get description() {
        return this.roomForm.get('description')
    }

    get price() {
        return this.roomForm.get('price')
    }

    ngOnDestroy() {
        this.store.dispatch(addRoomsToList({roomList: []}))
    }

}
