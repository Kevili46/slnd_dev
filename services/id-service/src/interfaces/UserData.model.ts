export interface UserData {
    uuid: string,
    data: {
        functional: boolean,
        analytics: boolean,
        theme: string,
        lang: string,
    }
    createdAt: Date,
}