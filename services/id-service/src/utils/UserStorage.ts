import * as crypto from 'crypto';
import { UserData } from "@interfaces/UserData.model";

export const userStorage: Map<string, UserData> = new Map();

export const addNewUser: () => string = () => {
    const uuid = createUUID();
    const plainData: UserData = {
        uuid,
        data: {
            functional: false,
            analytics: false,
            theme: 'light',
            lang: 'EN'
        },
        createdAt: new Date(),
    }
    userStorage.set(uuid, plainData);
    return uuid;
}

const createUUID: () => string = () => {
    let uuid: string = 'slnd';
    for (let i = 0; i < 3; i++) {
        const fragment: string = crypto.randomBytes(8).toString('hex');
        uuid += `-${fragment}`;
    }

    return uuid;
}