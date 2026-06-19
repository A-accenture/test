import { Schema, model, Document } from "mongoose";

export interface IWorkout extends Document {
  userName: string;
  workoutTitle: string;
  durationMinutes: number;
  intensity: string;
  scheduledAt: Date;
  completed: boolean;
}

const workoutSchema = new Schema<IWorkout>({
  userName: { type: String, required: true },
  workoutTitle: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  completed: { type: Boolean, required: true, default: false },
});

export const Workout = model<IWorkout>("Workout", workoutSchema);
