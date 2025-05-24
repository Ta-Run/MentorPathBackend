import { Document, Types } from 'mongoose';

// Interface for the Client model


export interface IUser extends Document {
  email: string;
  password: string;
  name?: string; // Name field (varchar)
}