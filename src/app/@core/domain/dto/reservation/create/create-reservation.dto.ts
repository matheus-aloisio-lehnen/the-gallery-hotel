import { CreatePersonalDataDto } from "../../user/create/create-personal-data.dto";
import { CreateAddressDto } from "../../user/create/create-address.dto";

export interface CreateReservationDto {
    roomId: number;
    startDate: string;
    endDate: string;
    email: string,
    password: string,
    role: string,
    personalData: CreatePersonalDataDto;
    address: CreateAddressDto;
}
