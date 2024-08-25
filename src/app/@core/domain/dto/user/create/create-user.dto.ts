import { CreatePersonalDataDto } from "./create-personal-data.dto";
import { CreateAddressDto } from "./create-address.dto";
import { Role } from "../../../enum/role.enum";

export interface CreateUserDto {
    email: string;
    password: string;
    role: Role;
    personalData: CreatePersonalDataDto;
    address: CreateAddressDto;
}
