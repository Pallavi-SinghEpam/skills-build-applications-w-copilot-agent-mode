import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', firstName: 'Alex', lastName: 'Rivera', totalPoints: 1250 },
      { username: 'sam.moves', email: 'sam@example.com', firstName: 'Sam', lastName: 'Patel', totalPoints: 980 },
      { username: 'jordan.fit', email: 'jordan@example.com', firstName: 'Jordan', lastName: 'Kim', totalPoints: 840 },
      { username: 'taylor.trains', email: 'taylor@example.com', firstName: 'Taylor', lastName: 'Morgan', totalPoints: 720 },
    ]);
    const teams = await Team.create([
      { name: 'Trail Blazers', description: 'Outdoor miles and weekend hikes', members: [users[0]._id, users[1]._id], points: 2230 },
      { name: 'Daily Momentum', description: 'Small steps, every day', members: [users[2]._id, users[3]._id], points: 1560 },
    ]);

    await User.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { team: teams[1]._id });

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, type: 'running', durationMinutes: 35, caloriesBurned: 320, date: new Date('2026-09-26T08:00:00Z') },
      { user: users[1]._id, team: teams[0]._id, type: 'cycling', durationMinutes: 48, caloriesBurned: 410, date: new Date('2026-09-25T17:30:00Z') },
      { user: users[2]._id, team: teams[1]._id, type: 'strength', durationMinutes: 40, caloriesBurned: 280, date: new Date('2026-09-24T07:15:00Z') },
      { user: users[3]._id, team: teams[1]._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 120, date: new Date('2026-09-23T18:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 1250, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 980, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 840, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 720, rank: 4 },
    ]);

    await Workout.create([
      { title: 'Steady State Run', description: 'A comfortable-paced run to build aerobic endurance.', type: 'cardio', durationMinutes: 30, difficulty: 'beginner', recommendedFor: [users[0]._id, users[1]._id] },
      { title: 'Full-Body Strength', description: 'A balanced circuit using bodyweight movements.', type: 'strength', durationMinutes: 35, difficulty: 'intermediate', recommendedFor: [users[2]._id, users[3]._id] },
      { title: 'Mobility Reset', description: 'Gentle stretches and mobility drills for recovery.', type: 'recovery', durationMinutes: 20, difficulty: 'beginner', recommendedFor: users.map((user) => user._id) },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
