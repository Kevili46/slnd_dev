import { UserData } from "@core/services/id/models/user-data.model";


export interface IdResponse {
    token: string,
    userId: string,
    userData: UserData,
}