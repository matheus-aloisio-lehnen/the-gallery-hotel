import {  Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { SNACKBAR } from "../../../configs/mat-snackbar.config";
import { MessengerService } from "../../messenger/messenger.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {


    constructor(private messenger: MessengerService) {
    }

    handleError(error: HttpErrorResponse): void {
        // const handler = fa
        // if (handler) {
        //     handler.handle(error);
        // } else {
        //     console.log('Ops! Ocorreu um erro desconhecido: ', error);
        //     this.messenger.send('Ops! Ocorreu um erro desconhecido', undefined, SNACKBAR.error);
        // }
    }
}
