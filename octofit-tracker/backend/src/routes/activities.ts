import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().limit(50).lean();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, distanceMiles, date } = req.body;

  if (!userId || !type || !durationMinutes) {
    return res.status(400).json({ message: 'userId, type, and durationMinutes are required.' });
  }

  const activity = new Activity({
    userId,
    type,
    durationMinutes,
    distanceMiles: distanceMiles ?? 0,
    date: date ? new Date(date) : new Date(),
  });

  await activity.save();
  res.status(201).json(activity);
});

export default router;
