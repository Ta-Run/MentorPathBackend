import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { ProgressPanelController } from './progress.controller';
import { AuthenticateMiddleware as Authenticate } from '../../../middleware/authentication';

export const router = express.Router();

router.post('/progressDeatils', (request: Request, response: Response, next: NextFunction) => {
  ProgressPanelController.progressDeatils(request, response, next);
});











