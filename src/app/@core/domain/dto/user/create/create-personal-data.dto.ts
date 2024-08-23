import { RoomStatus } from "../../../enum/room-status.enum";

export interface CreatePersonalDataDto {
    name: string;
    documentNumber: string;
    mobile: string;
    legalStatus: RoomStatus;
}
