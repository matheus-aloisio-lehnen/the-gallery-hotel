import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";
import { MatStepper, MatStepperModule, } from "@angular/material/stepper";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LetDirective } from "@ngrx/component";
import { MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { AsyncPipe, formatDate } from "@angular/common";

import { Loading } from "../../../../../domain/enum/loading.enum";
import { ErrorMessengerUtil } from "../../../../../infra/utils/form/messenger/error-messenger.util";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../../../infra/configs/mask.config";
import { Room } from "../../../../../domain/interface/room.interface";
import { AppState } from "../../../../../domain/type/app-state.type";
import { selectAllRooms } from "../../../../../infra/store/ngrx/selectors/room.selector";
import { ReservationService } from "../../../../../infra/services/service/reservation/reservation.service";
import { addDays, format } from "date-fns";
import { Role } from "../../../../../domain/enum/role.enum";
import { CreateReservationDto } from "../../../../../domain/dto/reservation/create/create-reservation.dto";


@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrl: './add-reservation.component.scss',
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
        CurrencyMaskModule,
        MatSelectModule,
        MatOptionModule,
        AsyncPipe
    ]
})
export class AddReservationComponent extends ErrorMessengerUtil {


    @ViewChild('stepper') stepper!: MatStepper;
    protected readonly ZIPCODE_MASK: string;
    protected readonly CPF_MASK: string;
    protected readonly MOBILE_MASK: string;
    loading$: Observable<boolean>;
    roomList$: Observable<Room[]>;
    hide: boolean;
    lastCheckAvailable: boolean;
    reservationForm: FormGroup;
    authForm: FormGroup;
    personalDataForm: FormGroup;
    addressForm: FormGroup;
    today: Date;

    constructor(
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<AddReservationComponent>,
    ) {
        super();
        this.ZIPCODE_MASK = ZIPCODE_MASK;
        this.CPF_MASK = CPF_MASK;
        this.MOBILE_MASK = MOBILE_MASK;
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.addGuest])
        this.roomList$ = this.store.select(selectAllRooms);
        this.hide = true;
        this.lastCheckAvailable = false;
        this.today = new Date();

        this.reservationForm = this.formBuilder.group({
            roomId: [ 1 ],
            startDate: [ this.today, Validators.required ],
            endDate: [ format(addDays(this.today, 7), 'yyyy-MM-dd') ],
        }, { updateOn: 'blur' });
        this.authForm = this.formBuilder.group({
            email: [ 'teste@hotmail.com', [ Validators.required, Validators.email ] ],
            password: [ '123456', Validators.required ],
            role: [ Role.guest, Validators.required ],
        }, { updateOn: 'blur' })
        this.personalDataForm = this.formBuilder.group({
            name: [ 'c', Validators.required ],
            documentNumber: [ '231.312.321-12', Validators.required ],
            mobile: [ '(48) 94089-4321', Validators.required ],
        }, { updateOn: 'blur' })
        this.addressForm = this.formBuilder.group({
            zipCode: [ '12312-312', Validators.required ],
            street: [ 'c', Validators.required ],
            number: [ 'c', Validators.required ],
            city: [ 'c', Validators.required ],
            uf: [ 'SC', [ Validators.required, Validators.minLength(2), Validators.maxLength(2) ] ],
        }, { updateOn: 'blur' });

        // this.reservationForm = this.formBuilder.group({
        //     roomId: [ '' ],
        //     startDate: [ '', Validators.required ],
        //     endDate: [ '' ],
        // }, { updateOn: 'blur' });
        // this.authForm = this.formBuilder.group({
        //     email: [ '', [ Validators.required, Validators.email ] ],
        //     password: [ '', Validators.required ],
        //     role: [ Role.guest, Validators.required ],
        // }, { updateOn: 'blur' })
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
    }

    add() {
        const createReservationDto: CreateReservationDto = {
            startDate: format(this.startDate?.value, 'yyyy-MM-dd'),
            endDate: format(this.endDate?.value, 'yyyy-MM-dd'),
            roomId: this.roomId?.value,
            personalData: this.personalDataForm.value,
            address: this.addressForm.value,
            email: this.email?.value,
            password: this.password?.value,
            role: Role.guest,
        }
        this.reservationService.add(createReservationDto)
        this.dialogRef.close(true);
    }

    get roomId() {
        return this.reservationForm.get('roomId');
    }

    get startDate() {
        return this.reservationForm.get('startDate');
    }

    get endDate() {
        return this.reservationForm.get('endDate');
    }

    get email() {
        return this.authForm.get('email');
    }

    get password() {
        return this.authForm.get('password');
    }

    get role() {
        return this.authForm.get('role');
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

    async checkAvailability() {
        const startDateStr = formatDate(this.startDate?.value, 'yyyy-MM-dd', 'pt-BR');
        const endDateStr = formatDate(this.endDate?.value, 'yyyy-MM-dd', 'pt-BR')
        const queryParams = `?roomId=${ this.roomId?.value }&startDate=${ startDateStr }&endDate=${ endDateStr }`;
        const isAvailable = await this.reservationService.isRoomAvailable(queryParams);
        this.lastCheckAvailable = isAvailable;
        if (isAvailable) {
            this.stepper.next();
        }
    }
}
