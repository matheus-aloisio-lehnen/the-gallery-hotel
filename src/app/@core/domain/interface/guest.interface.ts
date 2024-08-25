import { PersonalData } from "./personal-data.interface";
import { Address } from "./address.interface";

export interface Guest {
    id?: number,
    personalData?: PersonalData,
    address?: Address,
}
