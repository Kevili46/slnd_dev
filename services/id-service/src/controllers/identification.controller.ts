import { Request, Response, NextFunction } from 'express';
import * as idService from '#services/identification.service';

export const initIdentification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

        const identification = await idService.identifyUser(token);

        if (!identification) {
            return res.status(400).json({ error: 'Identification failed.' });
        }

        return res.status(200).json(identification);

    } catch (error) {
        next(error);
    }
};