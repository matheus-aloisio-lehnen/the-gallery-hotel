import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { signInDtoFactory } from "../../../domain/dto/auth/sign-in/sign-in.dto";
import { ErrorMessengerUtil } from "../../../infra/utils/form/messenger/error-messenger.util";
import { RouterLink, RouterOutlet } from "@angular/router";
import { RouteList } from "../../../domain/enum/route-list.enum";
import { LetDirective } from "@ngrx/component";
import { AuthService } from "../../../infra/services/service/auth.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ AuthService ],
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        RouterLink,
        LetDirective,
        RouterOutlet
    ]
})
export class SignInComponent extends ErrorMessengerUtil {


    protected readonly RouteList: typeof RouteList;
    form: FormGroup;
    hide: boolean;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
    ) {
        super();
        this.RouteList = RouteList;
        this.hide = true;

        this.form = this.formBuilder.group({
            email: [ 'a@hotmail.com', [ Validators.required, Validators.email ] ],
            password: [ '123456', Validators.required ],
        }, { updateOn: 'blur'})
        // this.form = this.formBuilder.group({
        //     email: [ '', [ Validators.required, Validators.email ] ],
        //     password: [ '', Validators.required ],
        // }, { updateOn: 'blur'})
    }

    async signIn() {
        if(this.form.invalid) {
            return this.form.markAllAsTouched();
        }
        const signInDto = signInDtoFactory(this.form);
        await this.authService.signIn(signInDto);
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

}

