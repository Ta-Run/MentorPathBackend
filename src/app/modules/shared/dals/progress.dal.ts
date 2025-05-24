import { Progress } from '../models/progress.model';
import { IProgress } from '../interfaces/progess.interface';
import { MentorError } from '../../../utils';
// import bcrypt from 'bcrypt';


class ProgessDal {
    async progressUpdate(userId: any, videoId: any, lastWatchedAt: any, merged: any): Promise<IProgress> {
        try {
            const result: any = await Progress.findOneAndUpdate(
                { userId, videoId },
                { intervals: merged, lastWatchedAt, updatedAt: new Date() },
                { upsert: true }
            );
            return result
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new MentorError(error.status, 'Failed to create user', error);
        }
    }

    async findProgess(userId: any, videoId: any): Promise<IProgress | any> {
        try {

            let result: any = await Progress.findOne({ userId, videoId });

            return result
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new MentorError(error.status, error.message);
        }
    }




}
export const Dal = new ProgessDal();