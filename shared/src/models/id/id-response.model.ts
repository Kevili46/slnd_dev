import { UserData } from "./user-data.model.js";

export interface IdResponse {
    token: string,
    userId: string,
    userData: UserData,
}