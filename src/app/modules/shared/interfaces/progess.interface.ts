import { Document, Types } from 'mongoose';
export interface Interval {
    start: number;
    end: number;
}

export interface IProgress extends Document {

    userId?: Types.ObjectId;
    videoId?: Types.ObjectId;
    intervals?: Interval[];
    lastWatchedAt?: number;
    updatedAt?: string;
    rawIntervals?: Interval[];

}
