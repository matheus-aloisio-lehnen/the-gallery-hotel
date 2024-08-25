import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LetDirective } from "@ngrx/component";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxMaskDirective } from "ngx-mask";

import { Loading } from "../../../domain/enum/loading.enum";
import { BaseComponent } from "../../shared/base/base.component";
import { Icon } from "../../../domain/enum/icon.enum";
import { Role } from "../../../domain/enum/role.enum";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../infra/configs/mask.config";
import { CreateUserDto } from "../../../domain/dto/user/create/create-user.dto";
import { StaffService } from "../../../infra/services/service/staff/staff.service";
import { AppState } from "../../../domain/type/app-state.type";
import { Staff } from "../../../domain/interface/staff.interface";
import { selectAllStaffs } from "../../../infra/store/ngrx/selectors/staff.selector";

@Component({
    selector: 'app-staff',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.scss',
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
        NgxMaskDirective,
        AsyncPipe,
    ]
})
export class StaffComponent extends BaseComponent implements OnInit {


    protected readonly ZIPCODE_MASK = ZIPCODE_MASK;
    protected readonly CPF_MASK = CPF_MASK;
    protected readonly MOBILE_MASK = MOBILE_MASK;
    protected readonly Icon = Icon;
    @ViewChild('stepper') stepper!: MatStepper;
    loading$: Observable<boolean>;
    hide: boolean;
    showAddForm: boolean;
    authForm: FormGroup;
    personalDataForm: FormGroup;
    addressForm: FormGroup;
    displayedColumns: string[];
    staffList$: Observable<Staff[]>;


    constructor(
        store: Store<AppState>,
        router: Router,
        private staffService: StaffService,
        private formBuilder: FormBuilder,
    ) {
        super(store, router);
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.getAllStaffs] || appState.loading[Loading.addStaff] || appState.loading[Loading.deleteStaff]);
        this.staffList$ = this.store.select(selectAllStaffs);
        this.hide = true;
        this.showAddForm = false;
        this.displayedColumns = [ 'name', 'email', 'role', 'actions' ];
        this.authForm = this.formBuilder.group({
            email: [ 'c@hotmail.com', [ Validators.required, Validators.email ] ],
            password: [ '123456', Validators.required ],
            role: [ Role.receptionist, Validators.required ],
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
        // this.authForm = this.formBuilder.group({
        //     email: [ '', [ Validators.required, Validators.email ] ],
        //     password: [ '', Validators.required ],
        //     role: [ Role.receptionist, Validators.required ],
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

    ngOnInit() {
        this.staffService.getAll();
    }

    add() {
        if (this.checkInvalidForm()) return;

        const createUserDto: CreateUserDto = {
            email: this.email?.value,
            password: this.password?.value,
            role: this.role?.value,
            personalData: this.personalDataForm.value,
            address: this.addressForm.value
        }

        this.staffService.add(createUserDto)
            .subscribe((data: Staff) => {
                if(data.id) {
                    this.resetForm();
                    this.showAddForm = false;
                    this.staffService.getAll();
                } else {
                    this.stepper.selectedIndex = 0;
                }
            });
    }

    delete(id: number) {
        this.staffService.delete(id);
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

    resetForm() {
        this.authForm.reset();
        this.personalDataForm.reset();
        this.addressForm.reset();
    }

    private checkInvalidForm() {
        let hasInvalidForm = false;
        if (this.authForm.invalid) {
            this.authForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.personalDataForm.invalid) {
            this.personalDataForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.addressForm.invalid) {
            hasInvalidForm = true;
        }
        return hasInvalidForm;
    }

}