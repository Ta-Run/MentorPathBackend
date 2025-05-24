import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { SuperAdminPanelController } from './superAdmin.controller';
import { AuthenticateMiddleware as Authenticate } from '../../../middleware/authentication';

export const router = express.Router();
router.post('/register-superAdmin', (request: Request, response: Response, next: NextFunction) => {
  SuperAdminPanelController.registerSuperAdmin(request, response, next);
});


router.post('/login', (request: Request, response: Response, next: NextFunction) => {
  SuperAdminPanelController.login(request, response, next);
});


router.post('/invite-accountant', Authenticate.superAdminAuthenticate, (request: Request, response: Response, next: NextFunction) => {
  SuperAdminPanelController.inviteAccountant(request, response, next);
});
        
