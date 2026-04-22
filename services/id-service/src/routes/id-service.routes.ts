import { RequestHandler, Router } from 'express';
import * as identificationController from '#controllers/identification.controller';
import * as patchOptionsController from '#controllers/patch-options.controller';
import { requireAuth } from '#middleware/require-auth';

const router = Router();

router.get('/init', identificationController.initIdentification);

router.patch('/user-data', requireAuth, patchOptionsController.patchUserOptions as RequestHandler);

export default router;