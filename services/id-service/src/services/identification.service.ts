import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { findOrCreateUser } from '#repositories/user.repository';
import { defaultOptions, IdResponse } from '@slnd/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export const identifyUser = async (token: string | undefined): Promise<IdResponse | null> => {
    let userId: string | null = null;

    if (token) {
        try {
            const verified = jwt.verify(token, JWT_SECRET) as { userId: string };
            userId = verified.userId;
        } catch {
            userId = null;
        }
    }

    const userData = await findOrCreateUser(userId, defaultOptions);

    if (!userData) {
        return null;
    }

    const newToken = jwt.sign({ userId: userData.userId }, JWT_SECRET, { expiresIn: '1y' });

    return {
        token: newToken,
        userId: userData.userId,
        userData
    };
};