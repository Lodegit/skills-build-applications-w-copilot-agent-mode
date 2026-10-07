import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Mona Patel',
                email: 'mona.patel@example.com',
                fitnessLevel: 'Advanced',
                goals: ['Run a 10K', 'Improve mobility'],
            },
            {
                name: 'Alex Chen',
                email: 'alex.chen@example.com',
                fitnessLevel: 'Intermediate',
                goals: ['Build strength', 'Stay consistent'],
            },
            {
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                fitnessLevel: 'Beginner',
                goals: ['Increase endurance', 'Form a routine'],
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Sunrise Striders',
                description: 'Early-morning runners focused on endurance.',
                members: [users[0]._id, users[2]._id],
                objective: 'Complete a community 5K challenge',
            },
            {
                name: 'Power Circuit Crew',
                description: 'Strength-focused teammates building sustainable progress.',
                members: [users[1]._id],
                objective: 'Increase total weekly strength sessions',
            },
        ]);
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Running',
                durationMinutes: 35,
                distanceKm: 5.2,
                caloriesBurned: 420,
                date: new Date('2026-10-06T07:00:00.000Z'),
            },
            {
                user: users[1]._id,
                type: 'Strength',
                durationMinutes: 45,
                distanceKm: 0,
                caloriesBurned: 390,
                date: new Date('2026-10-06T18:30:00.000Z'),
            },
            {
                user: users[2]._id,
                type: 'Yoga',
                durationMinutes: 25,
                distanceKm: 0,
                caloriesBurned: 160,
                date: new Date('2026-10-07T06:15:00.000Z'),
            },
        ]);
        await Leaderboard.insertMany([
            { user: users[0]._id, points: 1420, streak: 8, rank: 1, period: 'Weekly' },
            { user: users[1]._id, points: 1315, streak: 6, rank: 2, period: 'Weekly' },
            { user: users[2]._id, points: 1180, streak: 3, rank: 3, period: 'Weekly' },
        ]);
        await Workout.insertMany([
            {
                name: 'Interval Power Run',
                focus: 'Cardio endurance',
                durationMinutes: 30,
                difficulty: 'Challenging',
                exercises: ['Warm-up jog', 'Sprint intervals', 'Recovery walk'],
            },
            {
                name: 'Core and Mobility Reset',
                focus: 'Posture and recovery',
                durationMinutes: 20,
                difficulty: 'Easy',
                exercises: ['Plank', 'Dead bug', 'Hip stretch'],
            },
            {
                name: 'Upper Body Strength Circuit',
                focus: 'Strength',
                durationMinutes: 40,
                difficulty: 'Moderate',
                exercises: ['Push-ups', 'Rows', 'Shoulder press', 'Triceps dips'],
            },
        ]);
        console.log(`Seeded users: ${users.length}`);
        console.log(`Seeded teams: ${teams.length}`);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
