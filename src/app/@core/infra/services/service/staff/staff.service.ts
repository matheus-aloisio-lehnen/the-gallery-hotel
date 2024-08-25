import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { CreateUserDto } from "../../../../domain/dto/user/create/create-user.dto";
import { HttpService } from "../../http/http.service";
import { User } from "../../../../domain/interface/user.interface";
import { Staff } from "../../../../domain/interface/staff.interface";
import { addStaffsToList } from "../../../store/ngrx/actions/staff.actions";

@Injectable({
    providedIn: 'root'
})
export class StaffService {

    constructor(
        private http: HttpService,
        private store: Store,
    ) {
    }

    getAll() {
        return this.http.getAllStaffs()
            .subscribe((data: User[]) => {
                const staffList = this.userToStaffList(data);
                this.store.dispatch(addStaffsToList({ staffList: staffList }))
            })

    }

    add(createUserDto: CreateUserDto){
        return this.http.addStaff(createUserDto);
    }

    delete(id: number) {
        return this.http.deleteStaff(id)
            .subscribe((isDeleted: boolean) =>isDeleted && this.getAll());
    }

    userToStaffList(users: User[]): Staff[] {
        return users.map((user: User)=> {
            return {
                id: user.id,
                name: user.personalData.name,
                email: user.email,
                role: user.role,
            }
        })
    }
}
