import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorage } from "../../store/storage/local/local.storage";
import { inject } from "@angular/core";
import { StorageKeys } from "../../../domain/enum/storage-keys.enum";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorage = inject(LocalStorage);
    const authToken = localStorage.get(StorageKeys.authToken);

    req = req.clone({ setHeaders: { Authorization: `Bearer ${ authToken }` } })

    return next(req);
};
