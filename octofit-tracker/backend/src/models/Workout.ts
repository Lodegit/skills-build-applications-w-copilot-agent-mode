import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
    exercises: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
