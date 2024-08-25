import { Injectable } from '@angular/core';
import { CreateRoomDto } from "../../../../domain/dto/room/create-room.dto";
import { HttpService } from "../../http/http.service";
import { Store } from "@ngrx/store";
import { addRoomsToList } from "../../../store/ngrx/actions/room.actions";
import { Room } from "../../../../domain/interface/room.interface";

@Injectable({
    providedIn: 'root'
})
export class RoomService {


    constructor(
        private http: HttpService,
        private store: Store,
    ) {
    }

    getAll() {
        return this.http.getAllRooms()
            .subscribe((data: Room[]) => {
                console.log('data', data);
                this.store.dispatch(addRoomsToList({ roomList: data }))
            })
    }

    add(createRoomDto: CreateRoomDto) {
        return this.http.addRoom(createRoomDto);
    }

    delete(id: number) {
        return this.http.deleteRoom(id)
            .subscribe((isDeleted: boolean) =>isDeleted && this.getAll());
    }

}
