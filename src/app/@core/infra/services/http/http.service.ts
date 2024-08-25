import { Injectable } from '@angular/core';
import { map } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { Loading } from "../../../domain/enum/loading.enum";
import { CreateUserDto } from "../../../domain/dto/user/create/create-user.dto";
import { HttpAdapter } from "./adapter/http.adapter";
import { Result } from "../../../domain/type/result.type";
import { User } from "../../../domain/interface/user.interface";
import { Auth } from "../../../domain/interface/auth.interface";
import { CreateRoomDto } from "../../../domain/dto/room/create-room.dto";
import { SignInDto } from "../../../domain/dto/sign-in/sign-in.dto";
import { CreateReservationDto } from "../../../domain/dto/reservation/create/create-reservation.dto";
import { Room } from "../../../domain/interface/room.interface";
import { DashContract } from "../../../domain/type/dash-contract.type";


@Injectable({
    providedIn: 'root'
})
export class HttpService extends HttpAdapter {


    async signIn(signInDto: SignInDto): Promise<Auth> {
        const url: string = `${ environment.url }/auth/sign-in`;
        const result = await this.sendAsync<Result<Auth>>('post', url, signInDto, Loading.signIn)
        return result.data;
    }

    getAllStaffs() {
        const url: string = `${ environment.url }/staff/get-all`;
        return this.send<Result<User>>('get', url, null, Loading.getAllStaffs)
            .pipe(map(res => res.data));
    }

    addStaff(createUserDto: CreateUserDto) {
        const url: string = `${ environment.url }/staff/create`;
        return this.send<Result<User | boolean>>('post', url, createUserDto, Loading.addStaff)
            .pipe(map(res => res.data));
    }

    deleteStaff(id: number) {
        const url: string = `${ environment.url }/staff/delete/${ id }`;
        return this.send<Result<boolean>>('delete', url, null, Loading.deleteStaff)
            .pipe(map(res => res.data));
    }

    getAllRooms() {
        const url: string = `${ environment.url }/room/get-all`;
        return this.send<Result<User>>('get', url, null, Loading.getAllRooms)
            .pipe(map(res => res.data));
    }

    addRoom(createRoomDto: CreateRoomDto) {
        const url: string = `${ environment.url }/room/create`;
        return this.send<Result<User | boolean>>('post', url, createRoomDto, Loading.addRoom)
            .pipe(map(res => res.data));
    }

    deleteRoom(id: number) {
        const url: string = `${ environment.url }/room/delete/${ id }`;
        return this.send<Result<boolean>>('delete', url, null, Loading.deleteRoom)
            .pipe(map(res => res.data));
    }

    async isRoomAvailable(queryParams: string) {
        const url: string = `${ environment.url }/room/is-available${queryParams}`;
        const result = await this.sendAsync<Result<boolean>>('get', url, null, Loading.isRoomAvailable);
        return result.data;
    }

    getAllReservationsByMonth(month: number) {
        const url: string = `${ environment.url }/reservation/get-all?month=${month}`;
        return this.send<Result<Room[]>>('get', url, null, Loading.getAllReservationsByMonth)
            .pipe(map(res => res.data));
    }

    addReservation(createReservationDto: CreateReservationDto) {
        const url: string = `${ environment.url }/reservation/create`;
        return this.send<Result<User | boolean>>('post', url, createReservationDto, Loading.addReservation)
            .pipe(map(res => res.data));
    }

    deleteReservation(id: number) {
        const url: string = `${ environment.url }/reservation/delete/${ id }`;
        return this.send<Result<boolean>>('delete', url, null, Loading.deleteReservation)
            .pipe(map(res => res.data));
    }

    loadDashData() {
        const url: string = `${ environment.url }/dash/get-all`;
        return this.send<Result<DashContract>>('get', url, null, Loading.getDash)
            .pipe(map(res => res.data));
    }

}
