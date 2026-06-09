import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().limit(50).lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const user = new User({ name, email });
  await user.save();
  res.status(201).json(user);
});

export default router;
