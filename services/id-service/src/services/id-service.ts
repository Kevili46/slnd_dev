import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from '@utils/CONSTANTS';
import { userStorage, addNewUser } from '@utils/UserStorage';
import { UserData } from '@interfaces/UserData.model';

const JWT_SECRET = process.env.JWT_SECRET || '09q2jjg2309509112';

export const identifyUser: (token: string) => { token: string, userId: string } = (token) => {

    let userId: string | null = null;

    if (token) {
        try {
            userId = jwt.verify(token, JWT_SECRET) as string;
        } catch {
            userId = null;
        }
    }

    if (!userId) {
        userId = addNewUser();
    }

    const newToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1y' });

    return { token: newToken, userId };
}

export const getUserData: (uuid: string) => UserData | undefined = (uuid: string) => {
    return userStorage.get(uuid);
}