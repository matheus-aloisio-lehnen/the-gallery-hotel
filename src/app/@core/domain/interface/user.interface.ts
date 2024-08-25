import { Role } from "../enum/role.enum";
import { PersonalData } from "./personal-data.interface";
import { Address } from "./address.interface";

export interface User {
    id: number;
    email: string;
    password?: string;
    role: Role,
    personalData: PersonalData,
    address: Address,
}
