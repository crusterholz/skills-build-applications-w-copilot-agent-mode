import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('memberIds').lean();
  res.json(teams);
});

router.post('/', async (req, res) => {
  const { name, memberIds } = req.body;

  if (!name || !Array.isArray(memberIds)) {
    return res.status(400).json({ message: 'Name and memberIds are required.' });
  }

  const team = new Team({ name, memberIds });
  await team.save();
  res.status(201).json(team);
});

export default router;
