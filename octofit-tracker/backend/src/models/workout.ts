import mongoose, { Document, Schema } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  intensity: 'low' | 'medium' | 'high';
  exercises: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    exercises: [{ type: String, required: true }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
