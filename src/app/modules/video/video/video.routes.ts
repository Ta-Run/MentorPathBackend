import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { VideoPanelController } from './video.controller';
import { AuthenticateMiddleware as Authenticate } from '../../../middleware/authentication';

export const router = express.Router();
router.post('/getVideo', (request: Request, response: Response, next: NextFunction) => {
  VideoPanelController.getVideos(request, response, next);
});


router.post('/videoProgess', (request: Request, response: Response, next: NextFunction) => {
  VideoPanelController.getVideosProgess(request, response, next);
});



