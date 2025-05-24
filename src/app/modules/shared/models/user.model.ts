import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },
}, { timestamps: true });


export const User = mongoose.model<IUser>('User', UserSchema);
