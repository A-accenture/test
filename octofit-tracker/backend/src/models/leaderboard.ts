import { Schema, model, Document } from "mongoose";

export interface ILeaderboardEntry extends Document {
  rank: number;
  userName: string;
  teamName: string;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  userName: { type: String, required: true },
  teamName: { type: String, required: true },
  points: { type: Number, required: true },
});

export const Leaderboard = model<ILeaderboardEntry>("Leaderboard", leaderboardSchema);
