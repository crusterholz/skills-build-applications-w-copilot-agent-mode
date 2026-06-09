import mongoose, { Document, Schema } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  memberIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Team = mongoose.model<TeamDocument>('Team', teamSchema);
