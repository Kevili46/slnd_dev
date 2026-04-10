import { Router } from 'express';
import * as idServiceController from '#controllers/id-service.controller';

const router = Router();

router.get('/init', idServiceController.initIdentification);

export default router;