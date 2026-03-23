import { Request, Response, NextFunction } from 'express';
import * as aiAgentService from '@services/ai-agent-service';
import { GenRequestBody } from '@interfaces/GenRequestBody.model';

export const chatWithAi = async (
    req: Request<{}, {}, GenRequestBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const aiResponse = await aiAgentService.sendMessage(query);

        return res.status(200).json({
            success: true,
            data: aiResponse
        });
    } catch (error) {
        next(error);
    }
};