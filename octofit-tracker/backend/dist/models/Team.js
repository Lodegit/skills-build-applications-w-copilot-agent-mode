import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    objective: { type: String, default: 'Build consistency and accountability' },
}, { timestamps: true });
const Team = model('Team', teamSchema);
export default Team;
