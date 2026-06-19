import express from "express";
import { connectDatabase } from "./database.js";
import { User } from "./models/user.js";
import { Team } from "./models/team.js";
import { Activity } from "./models/activity.js";
import { Leaderboard } from "./models/leaderboard.js";
import { Workout } from "./models/workout.js";

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    port: PORT,
    apiUrl: API_URL,
    codespace: CODESPACE_NAME ?? null,
  });
});

app.get("/api/users/", async (_req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "OctoFit Tracker users endpoint", users });
  } catch (error) {
    res.status(500).json({ error: "Failed to load users", details: error });
  }
});

app.get("/api/teams/", async (_req, res) => {
  try {
    const teams = await Team.find();
    res.json({ message: "OctoFit Tracker teams endpoint", teams });
  } catch (error) {
    res.status(500).json({ error: "Failed to load teams", details: error });
  }
});

app.get("/api/activities/", async (_req, res) => {
  try {
    const activities = await Activity.find();
    res.json({ message: "OctoFit Tracker activities endpoint", activities });
  } catch (error) {
    res.status(500).json({ error: "Failed to load activities", details: error });
  }
});

app.get("/api/leaderboard/", async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json({ message: "OctoFit Tracker leaderboard endpoint", leaderboard });
  } catch (error) {
    res.status(500).json({ error: "Failed to load leaderboard", details: error });
  }
});

app.get("/api/workouts/", async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: "OctoFit Tracker workouts endpoint", workouts });
  } catch (error) {
    res.status(500).json({ error: "Failed to load workouts", details: error });
  }
});

app.get("/", (_req, res) => {
  res.send("OctoFit Tracker backend is running");
});

connectDatabase()
  .then(() => {
    console.log("API URL:", API_URL);
    app.listen(PORT, () => console.log(`Backend running on ${API_URL}`));
  })
  .catch((error: unknown) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
