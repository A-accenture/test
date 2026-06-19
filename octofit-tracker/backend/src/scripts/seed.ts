import mongoose from "mongoose";
import { User } from "../models/user.js";
import { Team } from "../models/team.js";
import { Activity } from "../models/activity.js";
import { Leaderboard } from "../models/leaderboard.js";
import { Workout } from "../models/workout.js";

// Seed the octofit_db database with test data.
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

async function seed() {
  console.log("Connecting to MongoDB for seeding:", MONGO_URI);

  await mongoose.connect(MONGO_URI);

  console.log("Clearing existing seed data...");
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = [
    { name: "Team Phoenix", description: "Rise together with steady progress.", totalPoints: 1280, memberCount: 4 },
    { name: "Team Velocity", description: "Fast workouts, faster results.", totalPoints: 1025, memberCount: 3 },
    { name: "Team Zenith", description: "Peak performance in every session.", totalPoints: 980, memberCount: 3 },
  ];

  const users = [
    { name: "Maya Patel", email: "maya@example.com", team: "Team Phoenix", totalPoints: 420, joinedAt: new Date("2026-01-14") },
    { name: "Noah Kim", email: "noah@example.com", team: "Team Phoenix", totalPoints: 360, joinedAt: new Date("2026-02-02") },
    { name: "Ava Martinez", email: "ava@example.com", team: "Team Velocity", totalPoints: 355, joinedAt: new Date("2026-03-08") },
    { name: "Liam Scott", email: "liam@example.com", team: "Team Zenith", totalPoints: 380, joinedAt: new Date("2026-03-25") },
  ];

  const activities = [
    { userName: "Maya Patel", userEmail: "maya@example.com", activityType: "Running", durationMinutes: 42, distanceKm: 8.1, caloriesBurned: 510, date: new Date("2026-06-15T07:30:00Z") },
    { userName: "Noah Kim", userEmail: "noah@example.com", activityType: "Cycling", durationMinutes: 55, distanceKm: 20.6, caloriesBurned: 620, date: new Date("2026-06-16T08:00:00Z") },
    { userName: "Ava Martinez", userEmail: "ava@example.com", activityType: "Yoga", durationMinutes: 35, distanceKm: 0, caloriesBurned: 190, date: new Date("2026-06-16T10:00:00Z") },
    { userName: "Liam Scott", userEmail: "liam@example.com", activityType: "Strength Training", durationMinutes: 48, distanceKm: 0, caloriesBurned: 455, date: new Date("2026-06-15T18:00:00Z") },
  ];

  const leaderboard = [
    { rank: 1, userName: "Maya Patel", teamName: "Team Phoenix", points: 420 },
    { rank: 2, userName: "Liam Scott", teamName: "Team Zenith", points: 380 },
    { rank: 3, userName: "Ava Martinez", teamName: "Team Velocity", points: 355 },
    { rank: 4, userName: "Noah Kim", teamName: "Team Phoenix", points: 360 },
  ];

  const workouts = [
    { userName: "Maya Patel", workoutTitle: "Morning Interval Run", durationMinutes: 45, intensity: "High", scheduledAt: new Date("2026-06-18T06:30:00Z"), completed: false },
    { userName: "Noah Kim", workoutTitle: "Endurance Ride", durationMinutes: 60, intensity: "Medium", scheduledAt: new Date("2026-06-19T07:00:00Z"), completed: false },
    { userName: "Ava Martinez", workoutTitle: "Sunrise Flow Yoga", durationMinutes: 40, intensity: "Low", scheduledAt: new Date("2026-06-18T08:00:00Z"), completed: true },
    { userName: "Liam Scott", workoutTitle: "Strength Circuit", durationMinutes: 50, intensity: "High", scheduledAt: new Date("2026-06-18T19:00:00Z"), completed: true },
  ];

  console.log("Inserting seed data...");
  await Promise.all([
    Team.insertMany(teams),
    User.insertMany(users),
    Activity.insertMany(activities),
    Leaderboard.insertMany(leaderboard),
    Workout.insertMany(workouts),
  ]);

  console.log("Seed the octofit_db database with test data complete.");
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB after seeding.");
}

seed().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
