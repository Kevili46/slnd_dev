import jwt from 'jsonwebtoken';
import { userStorage, addNewUser } from '@utils/UserStorage';
import { IdResponse, UserData } from '@slnd/core/models';

const JWT_SECRET = process.env.JWT_SECRET || '09q2jjg2309509112';

export const identifyUser: (token: string | undefined) => IdResponse = (token) => {

    let userId: string | null = null;

    if (token) {
        try {
            const verified = jwt.verify(token, JWT_SECRET) as { userId: string };
            userId = verified.userId;
        } catch {
            userId = null;
        }
    }

    if (!userId) {
        userId = addNewUser();
    }

    const newToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1y' });
    const userData: UserData = getUserData(userId);

    return { token: newToken, userId, userData };
}

export const getUserData: (userId: string) => UserData = (userId: string) => {
    return userStorage.get(userId)!;
}