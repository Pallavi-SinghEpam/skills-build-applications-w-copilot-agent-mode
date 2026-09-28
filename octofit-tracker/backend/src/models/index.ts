import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  totalPoints: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  type: { type: String, enum: ['walking', 'running', 'cycling', 'strength', 'yoga'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  caloriesBurned: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  updatedAt: { type: Date, default: Date.now },
});

const workoutSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'recovery'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const Leaderboard = model('Leaderboard', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);