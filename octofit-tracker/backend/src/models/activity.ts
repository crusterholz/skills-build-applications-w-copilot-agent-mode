import mongoose, { Document, Schema } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, default: 0 },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
