import { Router } from 'express';
import * as aiAgentController from '@controllers/ai-agent.controller';

const router = Router();

router.post('/sendMessage', aiAgentController.chatWithAi);

export default router;