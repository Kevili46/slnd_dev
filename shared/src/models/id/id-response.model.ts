import { UserData } from "./user-data.model";


export interface IdResponse {
    token: string,
    userId: string,
    userData: UserData,
}