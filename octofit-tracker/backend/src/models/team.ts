import { Schema, model, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  description: string;
  totalPoints: number;
  memberCount: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  memberCount: { type: Number, default: 0 },
});

export const Team = model<ITeam>("Team", teamSchema);
