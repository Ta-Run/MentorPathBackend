import { Request, Response, NextFunction } from 'express';
import { MentorError, MentorResult, JWT } from '../../../utils';

import { Dal as VideoDal } from '../../shared/dals/video.dal ';




export class VideoController {

  async getVideos(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

      const data: any = await VideoDal.getVideo();

      const result = new MentorResult(200, 'Video Get Successfully', data);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof MentorError) {
        next(new MentorError(error.status, error.message));
      } else {
        next(new MentorError(500, "Unexpected error occurred"));
      }
    }
  }


}

export const VideoPanelController = new VideoController();

