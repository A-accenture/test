import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  team: string;
  totalPoints: number;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  joinedAt: { type: Date, default: () => new Date() },
});

export const User = model<IUser>("User", userSchema);
