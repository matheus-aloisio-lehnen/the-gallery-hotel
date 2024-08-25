import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Loading } from "../../domain/enum/loading.enum";
import { SignInService } from "../../infra/services/service/sign-in/sign-in.service";
import { AppState } from "../../domain/type/app-state.type";
import { BaseComponent } from "../shared/base/base.component";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ SignInService ],
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
        RouterOutlet,
        MatSidenavContainer,
        MatSidenavContent,
        MatTooltipModule
    ]
})
export class SignInComponent extends BaseComponent {


    loading$: Observable<boolean>;
    form: FormGroup;
    hide: boolean;

    constructor(
        store: Store<AppState>,
        router: Router,
        private signInService: SignInService,
        private formBuilder: FormBuilder,
    ) {
        super(store, router);
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.signIn]);
        this.hide = true;
        this.form = this.formBuilder.group({
            email: [ 'a@hotmail.com', [ Validators.required, Validators.email ] ],
            password: [ '123456', Validators.required ],
        }, { updateOn: 'blur' })
        // this.form = this.formBuilder.group({
        //     email: [ '', [ Validators.required, Validators.email ] ],
        //     password: [ '', Validators.required ],
        // }, { updateOn: 'blur'})
    }

    async signIn() {
        if (this.form.invalid) {
            return this.form.markAllAsTouched();
        }
        await this.signInService.signIn(this.form.value);
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

}

