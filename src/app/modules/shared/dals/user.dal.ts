import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import mongoose, { Types } from 'mongoose';
import { KrvError } from '../../../utils';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UserDal {
    async user(userData: any): Promise<IUser> {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw new KrvError(error.status, 'Failed to create user', error);
        }
    }

    async findUserById(id: any): Promise<IUser> {
        try {
            const user: any = await User.findById(id);
            return user;
        } catch (error: any) {
            console.error('Error find user:', error);
            throw new KrvError(error.status, error.message);
        }
    }


}
export const Dal = new UserDal();