import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { MentorError } from '../../../utils';
// import bcrypt from 'bcrypt';


class UserDal {
    async createUser(userData: any): Promise<IUser> {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new MentorError(error.status, 'Failed to create user', error);
        }
    }

    async findUserById(id: any): Promise<IUser> {
        try {
            const user: any = await User.findById(id);
            return user;
        } catch (error: any) {
            console.error('Error find user:', error);
            throw new MentorError(error.status, error.message);
        }
    }


    async findUserByEmail(email: any): Promise<IUser> {
        try {
            const user: any = await User.findOne({ email: email });
            return user;
        } catch (error: any) {

            throw new MentorError(error.status, error.message);
        }
    }

    async updateUserById(
        clientId: string,
        clientData: any
    ): Promise<IUser> {
        try {
            await User.findByIdAndUpdate(
                { _id: clientId },
                { $set: clientData },
                { new: true }
            );
            const client: IUser = await this.findUserById(clientId);
            return client;
        } catch (error: any) {
            console.error('Error updating user:', error);
            throw new MentorError(error.status, error.message);
        }
    }
}
export const Dal = new UserDal();