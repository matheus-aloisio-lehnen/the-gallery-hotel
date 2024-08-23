import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReservationService } from "../../service/reservation.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { TitleCasePipe } from "@angular/common";
import { MatDatepickerModule, } from "@angular/material/datepicker";

import { Reservation } from "../../../../../domain/model/reservation";
import { NgxMaskDirective } from "ngx-mask";
import { ErrorMessengerUtil } from "../../../../../infra/utils/form/messenger/error-messenger.util";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../../../infra/configs/mask.config";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-edit-reservation',
    templateUrl: './edit-reservation.component.html',
    styleUrl: './edit-reservation.component.scss',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NgxMaskDirective,
        MatDatepickerModule,
        MatDialogModule,
        MatToolbarModule,
        MatDividerModule,
        TitleCasePipe
    ]
})
export class EditReservationComponent extends ErrorMessengerUtil {

    protected readonly ZIPCODE_MASK: string;
    protected readonly CPF_MASK: string;
    protected readonly MOBILE_MASK: string;
    reservationForm: FormGroup;
    personalDataForm: FormGroup;
    editMode: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<EditReservationComponent>
    ) {
        super();
        this.editMode = false;
        this.ZIPCODE_MASK = ZIPCODE_MASK;
        this.CPF_MASK = CPF_MASK;
        this.MOBILE_MASK = MOBILE_MASK;
        this.reservationForm = this.formBuilder.group({
            startDate: [ '', Validators.required ],
            endDate: [ '', Validators.required ],
            roomNumber: [ reservation.roomNumber, Validators.required ],
        }, { updateOn: 'blur' })
        this.personalDataForm = this.formBuilder.group({
            name: [ reservation.guest.personalData?.name, Validators.required ],
            documentNumber: [ reservation.guest.personalData?.documentNumber, Validators.required ],
            mobile: [ reservation.guest.personalData?.mobile, Validators.required ],
        }, { updateOn: 'blur' })

    }

    async edit() {
        // TODO
        // check if startDate or endDate changed, if doesnt keepit on the form.
        await this.reservationService.edit(this.reservation);
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

}
