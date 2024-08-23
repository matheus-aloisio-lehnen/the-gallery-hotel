import { PersonalData } from "./personal-data";
import { Address } from "./address";

export interface Guest {
    id?: number,
    personalData?: PersonalData,
    address?: Address,
}
