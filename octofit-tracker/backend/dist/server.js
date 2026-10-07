import express from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
export const apiBaseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
const resourceModels = {
    users: User,
    teams: Team,
    activities: Activity,
    leaderboard: Leaderboard,
    workouts: Workout,
};
const sendResource = async (req, res, resource) => {
    const model = resourceModels[resource];
    const data = await model.find({}).lean();
    res.json({ resource, data, count: data.length });
};
app.get('/api/users/', (req, res) => sendResource(req, res, 'users'));
app.get('/api/teams/', (req, res) => sendResource(req, res, 'teams'));
app.get('/api/activities/', (req, res) => sendResource(req, res, 'activities'));
app.get('/api/leaderboard/', (req, res) => sendResource(req, res, 'leaderboard'));
app.get('/api/workouts/', (req, res) => sendResource(req, res, 'workouts'));
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
export { app, port };
