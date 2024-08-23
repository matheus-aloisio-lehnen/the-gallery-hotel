import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LetDirective } from "@ngrx/component";
import { Store } from "@ngrx/store";

import { RouteList } from "../../../domain/enum/route-list.enum";
import { ChangePasswordDto, changePasswordDtoFactory } from "../../../domain/dto/auth/reset-password/change-password.dto";
import { ErrorMessengerUtil } from "../../../infra/utils/form/messenger/error-messenger.util";
import { passwordMatchValidator } from "../../../infra/utils/form/validators/password-match.validator";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { User } from "../../../domain/model/user";
import { selectUser } from "../../../infra/store/ngrx/selectors/user.selector";
import { Loading } from "../../../domain/enum/loading.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../../infra/services/service/auth.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [ './change-password.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ AuthService ],
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink,
        AsyncPipe,
        MatProgressSpinner,
        LetDirective
    ]
})
export class ChangePasswordComponent extends ErrorMessengerUtil {


    protected readonly RouteList: typeof RouteList;
    loading$: Observable<boolean>;
    user$: Observable<User | null>;
    resetPasswordId: string;
    hide: boolean[];
    form: FormGroup;
    hasValidResetPassword$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private store: Store<AppState>,
    ) {
        super();
        this.RouteList = RouteList;
        this.user$ = this.store.select(selectUser);
        this.loading$ = this.store.select((appState: AppState) => { return appState.loading[Loading.changePassword]} );
        this.resetPasswordId = this.route.snapshot.params['resetPasswordId'];
        this.hide = [true, true];
        this.hasValidResetPassword$ = this.authService.hasValidResetPassword(this.resetPasswordId);

        this.form = this.formBuilder.group({
            password: [ '', Validators.required ],
            confirmPassword: ['', Validators.required ]
        }, { validators: passwordMatchValidator })
    }

    async changePassword(user: User | null) {
        if(this.form.invalid || !user) {
            return this.form.markAllAsTouched();
        }

        const changePasswordDto: ChangePasswordDto = changePasswordDtoFactory(this.form, user.id);
        await this.authService.changePassword(this.resetPasswordId, changePasswordDto);
    }

    get id() {
        return this.form.get('id');
    }

    get password() {
        return this.form.get('password');
    }

    get confirmPassword() {
        return this.form.get('confirmPassword');
    }

}
