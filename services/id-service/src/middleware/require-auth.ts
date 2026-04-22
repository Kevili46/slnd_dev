import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export interface AuthRequest extends Request {
    userId: string;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET) as { userId: string };
        (req as AuthRequest).userId = verified.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};