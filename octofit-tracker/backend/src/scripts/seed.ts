// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Workout } from '../models/workout';
import { Leaderboard } from '../models/leaderboard';
import { databaseConfig } from '../config/database';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(databaseConfig.mongoUri, databaseConfig.mongooseOptions);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Alicia Vega', email: 'alicia.vega@example.com' },
    { name: 'Marcus Chen', email: 'marcus.chen@example.com' },
    { name: 'Priya Singh', email: 'priya.singh@example.com' },
    { name: 'Noah Brooks', email: 'noah.brooks@example.com' },
  ]);

  const workouts = await Workout.create([
    {
      title: 'Sunrise Strength Circuit',
      description: 'A balanced strength routine for the whole body.',
      intensity: 'medium',
      exercises: ['push-ups', 'bodyweight squats', 'plank', 'jumping jacks'],
    },
    {
      title: 'Endurance Run',
      description: 'A paced 5K run to build cardio endurance.',
      intensity: 'high',
      exercises: ['warm-up walk', 'steady run', 'cool-down stretch'],
    },
    {
      title: 'Core Stability Flow',
      description: 'Core-focused workout to improve posture and balance.',
      intensity: 'low',
      exercises: ['plank hold', 'bird dog', 'glute bridge', 'side plank'],
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Ocean Sprint',
      memberIds: [users[0]._id, users[1]._id],
    },
    {
      name: 'Peak Performers',
      memberIds: [users[2]._id, users[3]._id],
    },
  ]);

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'running',
      durationMinutes: 40,
      distanceMiles: 5,
      date: new Date('2026-06-01T07:30:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'cycling',
      durationMinutes: 60,
      distanceMiles: 18,
      date: new Date('2026-06-02T09:00:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'strength',
      durationMinutes: 35,
      distanceMiles: 0,
      date: new Date('2026-06-02T17:15:00Z'),
    },
    {
      userId: users[3]._id,
      type: 'yoga',
      durationMinutes: 50,
      distanceMiles: 0,
      date: new Date('2026-06-03T06:45:00Z'),
    },
    {
      userId: users[0]._id,
      type: 'swimming',
      durationMinutes: 30,
      distanceMiles: 1.2,
      date: new Date('2026-06-04T08:00:00Z'),
    },
  ]);

  await Leaderboard.create([
    {
      userId: users[0]._id,
      totalDuration: 70,
      activityCount: 2,
      rank: 1,
    },
    {
      userId: users[1]._id,
      totalDuration: 60,
      activityCount: 1,
      rank: 2,
    },
    {
      userId: users[2]._id,
      totalDuration: 35,
      activityCount: 1,
      rank: 3,
    },
    {
      userId: users[3]._id,
      totalDuration: 50,
      activityCount: 1,
      rank: 4,
    },
  ]);

  console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, and leaderboard snapshots.`);

  await mongoose.disconnect();
}

seed()
  .then(() => {
    console.log('Database seed complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
