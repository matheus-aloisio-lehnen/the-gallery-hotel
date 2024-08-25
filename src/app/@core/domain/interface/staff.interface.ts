import { Role } from "../enum/role.enum";

export interface Staff {
    id?: number;
    name: string;
    email: string;
    role: Role;
}