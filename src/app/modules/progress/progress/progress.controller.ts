import { Request, Response, NextFunction } from 'express';
import { MentorError, MentorResult, JWT } from '../../../utils';

import { Dal as ProgressDal } from '../../shared/dals/progress.dal';
import { ModifyRequest } from '../../../../../types.d';



export class ProgressController {


  async mergeIntervals(intervals: any) {


    const cleaned = intervals.filter((i: any) => i && typeof i.start === 'number' && typeof i.end === 'number');
    cleaned.sort((a: any, b: any) => a.start - b.start);
    const merged = [];
    for (let intv of intervals) {


      if (!merged.length || merged[merged.length - 1].end < intv.start) {
        merged.push(intv);
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, intv.end);
      }
    }


    return merged;
  }
  async progressDeatils(req: ModifyRequest, res: Response, next: NextFunction): Promise<any> {

    try {


      const { videoId, start, end } = req.body;

      const userId: any = "6831f429c97a28c50218a9de"


      let doc = await ProgressDal.findProgess(userId, videoId)

      // let intervals = doc ? [...doc.intervals, { start, end }] : [{ start, end }];
      let intervals = doc && Array.isArray(doc.intervals)
        ? [...doc.intervals.filter((i: any) => i && typeof i.start === 'number' && typeof i.end === 'number'), { start, end }]
        : [{ start, end }];

      const merged = await this.mergeIntervals(intervals);

      const lastWatchedAt = Math.max(...(await merged).map(i => i.end)) || 30;

      const result = await ProgressDal.progressUpdate(userId, videoId, lastWatchedAt, merged)


      return res.status(200).json({
        message: "Progress saved",
        progress: result,
      });

    } catch (error: unknown) {
      if (error instanceof MentorError) {
        next(new MentorError(error.status, error.message));
      } else {
        next(new MentorError(500, "Unexpected error occurred"));
      }
    }
  }
}

export const ProgressPanelController = new ProgressController();

