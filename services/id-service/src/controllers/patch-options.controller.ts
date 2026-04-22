import { Response, NextFunction } from 'express';
import { AuthRequest } from '#middleware/require-auth';
import * as patchOptionsService from '#services/patch-options.service';

export const patchUserOptions = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { options } = req.body;

        if (!options || typeof options !== 'object' || Array.isArray(options)) {
            return res.status(400).json({ error: 'Invalid payload: "options" must be a JSON object.' });
        }

        const updatedUser = await patchOptionsService.updateUserOptions(req.userId, options);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found in database.' });
        }

        return res.status(200).json({
            message: 'Options updated successfully',
            options: updatedUser.options
        });

    } catch (error) {
        next(error);
    }
};