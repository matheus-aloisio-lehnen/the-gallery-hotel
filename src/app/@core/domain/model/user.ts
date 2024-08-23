import { Role } from "../enum/role.enum";

export interface User {
    id: number;
    email: string;
    password?: string;
    status: boolean;
    role: Role
}
