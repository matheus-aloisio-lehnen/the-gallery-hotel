import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { SNACKBAR } from "../../../configs/mat-snackbar.config";
import { MessengerService } from "../../messenger/messenger.service";
import { RouteList } from "../../../../domain/enum/route-list.enum";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    private readonly networkErrors: number[] = [ 0 ];
    private readonly clientErrors: number[] = [ 400, 401, 403, 404 ];
    private readonly serverErrors: number[] = [ 500, 503 ];

    constructor(
        private router: Router,
        private messenger: MessengerService
    ) {
    }

    handleError(error: HttpErrorResponse): void {
        switch (true) {
            case this.networkErrors.includes(error.status):
                this.handleNetworkError(error);
                break;
            case this.clientErrors.includes(error.status):
                this.handleClientError(error);
                break;
            case this.serverErrors.includes(error.status):
                this.handleServerError(error);
                break;
            default:
                this.handleUnknownError(error);
                break;
        }
    }

    private handleNetworkError(error: HttpErrorResponse): void {
        this.messenger.send('Erro de rede. Verifique sua conexão.', undefined, SNACKBAR.error);
    }

    private handleClientError(error: HttpErrorResponse): void {
        const unauthorized = error.status == 401 || error.status == 403;
        if (unauthorized) {
            error = {
                ...error,
                message: 'Você não esta autenticado. Faça o login para conectar-se à PlayBPO',
            }
            setTimeout(() => {
                this.router.navigate([RouteList.signIn])
            }, 3000);
        }
        this.messenger.send(error.error, undefined, SNACKBAR.error);
    }

    private handleServerError(error: HttpErrorResponse): void {
        this.messenger.send(error.error, undefined, SNACKBAR.error);
    }

    private handleUnknownError(error: HttpErrorResponse): void {
        this.messenger.send('Ops! Ocorreu um erro desconhecido', undefined, SNACKBAR.error);
    }

}
