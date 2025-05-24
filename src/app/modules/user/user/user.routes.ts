import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { UserPanelController } from './user.controller';
import { AuthenticateMiddleware as Authenticate } from '../../../middleware/authentication';

export const router = express.Router();
router.post('/signup', (request: Request, response: Response, next: NextFunction) => {
  UserPanelController.registerUser(request, response, next);
});


router.post('/login', (request: Request, response: Response, next: NextFunction) => {
  UserPanelController.login(request, response, next);
});




