import { Injectable } from '@angular/core';
import { BaseStorage } from "../base/base.storage";

@Injectable({
    providedIn: 'root'
})
export class SessionStorage extends BaseStorage {

    constructor() {
        super();
    }

}
