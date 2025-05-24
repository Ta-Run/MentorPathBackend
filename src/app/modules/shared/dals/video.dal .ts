import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { MentorError } from '../../../utils';
import { Video } from '../models/video.model';
// import bcrypt from 'bcrypt';


class VideoDal {
    async getVideo(): Promise<IUser> {
        try {
            const video: any = await Video.find({});
            return video;
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new MentorError(error.status, 'Failed to create user', error);
        }
    }


}
export const Dal = new VideoDal();