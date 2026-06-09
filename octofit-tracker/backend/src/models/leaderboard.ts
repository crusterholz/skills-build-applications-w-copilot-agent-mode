import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardDocument extends Document {
  userId: mongoose.Types.ObjectId;
  totalDuration: number;
  activityCount: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalDuration: { type: Number, required: true },
    activityCount: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
