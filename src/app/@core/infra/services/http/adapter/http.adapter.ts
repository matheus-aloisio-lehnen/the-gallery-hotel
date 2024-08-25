import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, finalize, first, firstValueFrom, Observable, of, tap } from "rxjs";
import { Injectable } from "@angular/core";

import * as LoadingActions from "../../../store/ngrx/actions/loading.actions";
import { MessengerService } from "../../messenger/messenger.service";
import { SNACKBAR } from "../../../configs/mat-snackbar.config";
import { ErrorHandlerService } from "../error-handler/error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class HttpAdapter {

    constructor(
        protected http: HttpClient,
        protected store: Store,
        protected messenger: MessengerService,
        protected errorHandler: ErrorHandlerService,
    ) {
    }

    sendAsync = async <T>(method: string, url: string, body: Object | null = null, context: string): Promise<T> => {
        return await this.handleResponse(this.http.request<T>(method, url, { body }), context, true) as Promise<T>;
    }

    send = <T> (method: string, url: string, body: Object | null = null, context: string): Observable<T> => {
        return this.handleResponse(this.http.request<T>(method, url, { body }), context, false) as Observable<T>;
    }

    private handleResponse = <T>(response: Observable<T>, context: string, returnPromise: boolean): Observable<T> | Promise<T> => {
        this.store.dispatch(LoadingActions.startLoading({ context }));
        const request = response.pipe(
            first(),
            tap((response: any) => response && response.message && this.messenger.send(response.message, undefined, SNACKBAR.success)),
            catchError((httpError: HttpErrorResponse) => {
                console.log(httpError);
                this.errorHandler.handleError(httpError);
                return of({ data: false })
            }),
            finalize(() => {
                this.store.dispatch(LoadingActions.finishLoading({ context }));
            })
        );

        return returnPromise ? firstValueFrom(request) : request;
    }




}
