import { UserData } from '@slnd/core/models';
import * as crypto from 'crypto';

export const userStorage: Map<string, UserData> = new Map();

export const addNewUser: () => string = () => {
    const userId = createUUID();
    const plainData: UserData = {
        userId,
        data: {
            consent: {
                obtained: false,
                functional: false,
                analytics: false,
            },
            theme: 'light',
            lang: 'EN'
        },
        createdAt: new Date(),
    }
    userStorage.set(userId, plainData);
    return userId;
}

const createUUID: () => string = () => {
    let uuid: string = 'slnd';
    for (let i = 0; i < 3; i++) {
        const fragment: string = crypto.randomBytes(8).toString('hex');
        uuid += `-${fragment}`;
    }

    return uuid;
}