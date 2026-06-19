import { Schema, model, Document } from "mongoose";

export interface IActivity extends Document {
  userName: string;
  userEmail: string;
  activityType: string;
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Activity = model<IActivity>("Activity", activitySchema);
