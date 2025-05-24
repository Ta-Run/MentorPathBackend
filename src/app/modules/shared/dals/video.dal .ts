
import { MentorError } from '../../../utils';
import { Video } from '../models/video.model';
import { Progress } from '../models/progress.model';
import { IVideo } from '../interfaces/video.interface ';


class VideoDal {
    async getVideo(): Promise<IVideo> {
        try {
            const video: any = await Video.find({});
            return video;
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new MentorError(error.status, 'Failed to create user', error);
        }
    }


    async getVideoProgess(userId: any, videoId: any): Promise<IVideo | any> {
        try {
            const progressDoc = await Progress.findOne({ userId, videoId });

            if (!progressDoc) {
                return { progress: 0, intervals: [], lastWatchedAt: 0 };
            }

            const video: any = await Video.findById(videoId);
            const durationSec = video?.duration || 600; // Fallback

            const totalWatched = (progressDoc.intervals ?? []).reduce(
                (sum: number, i) => sum + (i.end - i.start),
                0
            );

            const progress = ((totalWatched / durationSec) * 100).toFixed(2);

            return {
                progress,
                intervals: progressDoc.intervals,
                lastWatchedAt: progressDoc.lastWatchedAt
            };

        } catch (error: any) {
            console.error('Error in getVideoProgress:', error);
            throw new MentorError(error.status, 'Failed to fetch video progress', error);
        }
    }



}
export const Dal = new VideoDal();