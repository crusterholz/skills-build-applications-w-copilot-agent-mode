import { Router } from 'express';
import { Activity } from '../models/activity';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalDuration: { $sum: '$durationMinutes' },
        activityCount: { $sum: 1 },
      },
    },
    { $sort: { totalDuration: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        userId: '$_id',
        name: '$user.name',
        email: '$user.email',
        totalDuration: 1,
        activityCount: 1,
      },
    },
  ]);

  if (leaderboard.length === 0) {
    const topUsers = await User.find().limit(5).lean();
    return res.json(
      topUsers.map((user) => ({
        userId: user._id,
        name: user.name,
        email: user.email,
        totalDuration: 0,
        activityCount: 0,
      }))
    );
  }

  res.json(leaderboard);
});

export default router;
