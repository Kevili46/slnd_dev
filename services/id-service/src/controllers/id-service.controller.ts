import { Request, Response, NextFunction } from 'express';
import * as idService from '@services/id-service';
import { COOKIE_NAME } from '@utils/CONSTANTS';
import { userStorage } from '@utils/UserStorage';
import { UserData } from '@interfaces/UserData.model';

export const initIdentification = async (
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies[COOKIE_NAME];

        const identification = idService.identifyUser(token);

        res.cookie(COOKIE_NAME, identification.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 31536000000
        });

        const userData: UserData | undefined = idService.getUserData(identification.userId);

        if (!userData) {
            return res.status(400).json({ error: 'Identification failed.' });
        }

        return res.status(200).json(userData);

    } catch (error) {
        next(error);
    }
};