import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LetDirective } from "@ngrx/component";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { NgxMaskDirective } from "ngx-mask";

import { ErrorMessengerUtil } from "../../../infra/utils/form/messenger/error-messenger.util";
import { RouteList } from "../../../domain/enum/route-list.enum";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../infra/configs/mask.config";
import { Loading } from "../../../domain/enum/loading.enum";
import { CreateUserDto, createUserDtoFactory } from "../../../domain/dto/user/create/create-user.dto";
import { AuthService } from "../../../infra/services/service/auth.service";
import { Role } from "../../../domain/enum/role.enum";
import { TitleCasePipe } from "@angular/common";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ AuthService, ],
    imports: [
        MatCardModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        LetDirective,
        MatRadioModule,
        MatProgressSpinnerModule,
        RouterLink,
        NgxMaskDirective,
        TitleCasePipe

    ]
})
export class SignUpComponent extends ErrorMessengerUtil implements OnDestroy {


    protected readonly ZIPCODE_MASK: string;
    protected readonly CPF_MASK: string;
    protected readonly MOBILE_MASK: string;
    protected readonly RouteList: typeof RouteList;
    @ViewChild('stepper') stepper!: MatStepper;
    loading$: Observable<boolean>;
    hide: boolean;
    authForm: FormGroup;
    personalDataForm: FormGroup;
    addressForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private store: Store<AppState>
    ) {
        super();
        this.ZIPCODE_MASK = ZIPCODE_MASK;
        this.CPF_MASK = CPF_MASK;
        this.MOBILE_MASK = MOBILE_MASK;
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.signUp])
        this.RouteList = RouteList;
        this.hide = true;
        // this.authForm = this.formBuilder.group({
        //     email: [ 'a@hotmail.com', [ Validators.required, Validators.email ] ],
        //     password: [ '123456', Validators.required ],
        //     role: [ Role.receptionist, Validators.required ],
        // }, { updateOn: 'blur' })
        // this.personalDataForm = this.formBuilder.group({
        //     name: [ 'a', Validators.required ],
        //     documentNumber: [ '231.312.321-12', Validators.required ],
        //     mobile: [ '(48) 94089-4321', Validators.required ],
        // }, { updateOn: 'blur' })
        // this.addressForm = this.formBuilder.group({
        //     zipCode: [ '12312-312', Validators.required ],
        //     street: [ 'a', Validators.required ],
        //     number: [ 'a', Validators.required ],
        //     city: [ 'a', Validators.required ],
        //     uf: [ 'SC', [Validators.required, Validators.minLength(2), Validators.maxLength(2)] ],
        // }, { updateOn: 'blur' });
        this.authForm = this.formBuilder.group({
            email: [ '', [ Validators.required, Validators.email ] ],
            password: [ '', Validators.required ],
            role: [ Role.receptionist, Validators.required ],
        }, { updateOn: 'blur' })
        this.personalDataForm = this.formBuilder.group({
            name: [ '', Validators.required ],
            documentNumber: [ '', Validators.required ],
            mobile: [ '', Validators.required ],
        }, { updateOn: 'blur' })
        this.addressForm = this.formBuilder.group({
            zipCode: [ '', Validators.required ],
            street: [ '', Validators.required ],
            number: [ '', Validators.required ],
            city: [ '', Validators.required ],
            uf: [ '', Validators.required ],
        }, { updateOn: 'blur' });
    }

    async signUp() {
        if (this.checkInvalidForm()) return;
        const createUserDto: CreateUserDto = createUserDtoFactory(this.authForm, this.personalDataForm, this.addressForm);
        const result = await this.authService.signUp(createUserDto);
        console.log('result component', result);
        this.stepper.selectedIndex = 0;
        this.email?.setErrors({ emailUsed: true })
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

    private clearForms() {
        this.authForm.reset();
        this.personalDataForm.reset();
        this.addressForm.reset();
    }

    ngOnDestroy() {
        // this.clearForms();
    }

    protected readonly Role = Role;
}
