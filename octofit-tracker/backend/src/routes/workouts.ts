import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().limit(50).lean();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const { title, description, intensity, exercises } = req.body;

  if (!title || !description || !intensity || !Array.isArray(exercises)) {
    return res.status(400).json({ message: 'title, description, intensity, and exercises are required.' });
  }

  const workout = new Workout({ title, description, intensity, exercises });
  await workout.save();
  res.status(201).json(workout);
});

export default router;
