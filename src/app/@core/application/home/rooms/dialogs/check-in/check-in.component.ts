import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LetDirective } from "@ngrx/component";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxMaskDirective } from "ngx-mask";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { differenceInDays } from "date-fns";

import { ErrorMessengerUtil } from "../../../../../infra/utils/form/messenger/error-messenger.util";
import { Room } from "../../../../../domain/model/room";
import { ReservationService } from "../../../reservations/service/reservation.service";
import { AppState } from "../../../../../infra/store/ngrx/state/app.state";
import { Loading } from "../../../../../domain/enum/loading.enum";
import { selectRoom, selectRoomList } from "../../../../../infra/store/ngrx/selectors/room.selector";
import {
    CreateReservationDto,
    createReservationDtoFactory
} from "../../../../../domain/dto/reservation/create/create-reservation.dto";
import { RoomStatus } from "../../../../../domain/enum/room-status.enum";
import { setRoom, updateRoomInList } from "../../../../../infra/store/ngrx/actions/room.actions";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../../../infra/configs/mask.config";
import { MatCardModule } from "@angular/material/card";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PaymentStatus } from "../../../../../domain/enum/payment-status.enum";
import { Reservation } from "../../../../../domain/model/reservation";

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrl: './check-in.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NgxMaskDirective,
        MatStepperModule,
        MatDatepickerModule,
        LetDirective,
        MatDialogModule,
        MatToolbarModule,
        MatDividerModule,
        CurrencyMaskModule
    ]
})
export class CheckInComponent extends ErrorMessengerUtil {


    protected readonly ZIPCODE_MASK: string;
    protected readonly CPF_MASK: string;
    protected readonly MOBILE_MASK: string;
    loading$: Observable<boolean>;
    reservationForm: FormGroup;
    personalDataForm: FormGroup;
    addressForm: FormGroup;
    paymentForm: FormGroup;
    room$: Observable<Room | null>;
    today: Date;

    constructor(
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<CheckInComponent>,
    ) {
        super();
        this.ZIPCODE_MASK = ZIPCODE_MASK;
        this.CPF_MASK = CPF_MASK;
        this.MOBILE_MASK = MOBILE_MASK;
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.signUp])
        this.room$ = this.store.select(selectRoom);
        this.today = new Date();
        this.reservationForm = this.formBuilder.group({
            startDate: [ this.today, Validators.required ],
            endDate: [ '', Validators.required ],
            roomNumber: [ '' ],
        }, { updateOn: 'blur' })
        this.personalDataForm = this.formBuilder.group({
            name: [ '' ],
            documentNumber: [ '' ],
            mobile: [ '' ],
        }, { updateOn: 'blur' })
        this.addressForm = this.formBuilder.group({
            zipCode: [ '' ],
            street: [ '' ],
            number: [ '' ],
            city: [ '' ],
            uf: [ '' ],
        }, { updateOn: 'blur' });
        // this.personalDataForm = this.formBuilder.group({
        //     name: [ '', Validators.required ],
        //     documentNumber: [ '', Validators.required ],
        //     mobile: [ '', Validators.required ],
        // }, { updateOn: 'blur' })
        // this.addressForm = this.formBuilder.group({
        //     zipCode: [ '', Validators.required ],
        //     street: [ '', Validators.required ],
        //     number: [ '', Validators.required ],
        //     city: [ '', Validators.required ],
        //     uf: [ '', Validators.required ],
        // }, { updateOn: 'blur' });
        this.paymentForm = this.formBuilder.group({
            payment: [ '', Validators.required ],
        }, { updateOn: 'blur' });
        this.store.select(selectRoomList).subscribe(result => console.log('result', result))
    }

    async checkIn(room: Room | null) {
        if (!room) return;
        if (await this.checkInvalidForm()) return;
        const diffDays = differenceInDays(new Date(this.endDate?.value), new Date(this.startDate?.value)) + 1;
        this.reservationForm.patchValue({ roomNumber: room.number });
        this.paymentForm.patchValue({ payment: room.price * diffDays });

        const createReservationDto: CreateReservationDto = createReservationDtoFactory(this.reservationForm, this.personalDataForm, this.addressForm, this.paymentForm);
        // await this.reservationService.add(createReservationDto);



        const RESERVATION_MOCK: Reservation = {
            startDate: new Date(createReservationDto.startDate),
            endDate: new Date(createReservationDto.endDate),
            paymentStatus: PaymentStatus.paid,
            roomNumber: createReservationDto.roomNumber,
            guest: createReservationDto.guest
        }
        const reservations = [RESERVATION_MOCK, ...room.reservations ?? []]
        const updatedRoom = { ...room, reservations: reservations, status: RoomStatus.busy};

        this.store.dispatch(updateRoomInList({ room: updatedRoom }));
        this.store.dispatch(setRoom({ room: null }));
        this.dialogRef.close(true);
    }

    get startDate() {
        return this.reservationForm.get('startDate');
    }

    get endDate() {
        return this.reservationForm.get('endDate');
    }

    get name() {
        return this.personalDataForm.get('name');
    }

    get documentNumber() {
        return this.personalDataForm.get('documentNumber');
    }

    get mobile() {
        return this.personalDataForm.get('mobile');
    }

    get zipCode() {
        return this.addressForm.get('zipCode');
    }

    get street() {
        return this.addressForm.get('street');
    }

    get number() {
        return this.addressForm.get('number');
    }

    get city() {
        return this.addressForm.get('city');
    }

    get uf() {
        return this.addressForm.get('uf');
    }

    get payment() {
        return this.paymentForm.get('payment');
    }

    onStartDateChange() {
        this.startDate?.value !== this.today && this.startDate?.patchValue(this.today);
    }

    private async checkInvalidForm() {
        let hasInvalidForm = false;
        if (this.reservationForm.invalid) {
            this.reservationForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.personalDataForm.invalid) {
            this.personalDataForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.addressForm.invalid) {
            this.addressForm.markAllAsTouched();
            hasInvalidForm = true;
        }
        return hasInvalidForm;
    }

}
