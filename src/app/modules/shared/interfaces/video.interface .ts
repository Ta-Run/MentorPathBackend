import { Document, Types } from 'mongoose';

export interface IVideo extends Document {
  title: String,
  duration: Number,
  url: String
}