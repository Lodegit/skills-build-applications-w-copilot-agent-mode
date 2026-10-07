import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, required: true, enum: ['Weekly', 'Monthly', 'All Time'] },
}, { timestamps: true });
const Leaderboard = model('Leaderboard', leaderboardEntrySchema);
export default Leaderboard;
