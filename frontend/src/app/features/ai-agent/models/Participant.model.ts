import { Role } from "./Roles.model";

export interface Participant {
    name: string,
    role: Role,
    img?: string,
}