import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { HttpService } from "../../http/http.service";
import { LocalStorage } from "../../../store/storage/local/local.storage";
import { StorageKeys } from "../../../../domain/enum/storage-keys.enum";
import { Auth } from "../../../../domain/interface/auth.interface";
import { SignInDto } from "../../../../domain/dto/sign-in/sign-in.dto";

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    constructor(
        private http: HttpService,
        private localStorage: LocalStorage,
        private router: Router,
        private store: Store
    ) {
    }

    async signIn(signInDto: SignInDto) {

        const auth: Auth = await this.http.signIn(signInDto);
        if (!auth) return;
        const user = auth.user;

        this.localStorage.set(StorageKeys.token, auth.token);
        // this.store.dispatch(setUser({ user: user }));
        await this.router.navigate([ 'home' ]);
    }
}
