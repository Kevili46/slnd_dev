import { Role } from "@features/ai-agent/models/roles.model";
export interface Participant {
    name: string,
    role: Role,
    img?: string,
}