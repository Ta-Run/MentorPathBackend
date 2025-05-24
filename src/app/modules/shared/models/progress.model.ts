import mongoose, { Schema, Document } from 'mongoose';
import { IProgress } from '../interfaces/progess.interface';


const intervalSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true }
}, { _id: false });

const progressSchema: Schema<IProgress> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  intervals: {
    type: [intervalSchema],
    default: []
  },
  lastWatchedAt: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

progressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);

