import mongoose, { Schema, Document } from 'mongoose';
import { IVideo } from '../interfaces/video.interface ';

const VideoSchema: Schema<IVideo> = new Schema({
  title: {
    type: String,
  },

  duration: {
    type: String,
  },

  url: {
    type: String,
  },
}, { timestamps: true });


export const Video = mongoose.model<IVideo>('Video', VideoSchema);
