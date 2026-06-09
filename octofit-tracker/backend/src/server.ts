import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';
import { databaseConfig } from './config/database';

const app = express();
app.use(cors());
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker backend', apiBaseUrl: API_BASE_URL });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL, codespaceName: CODESPACE_NAME ?? null });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

export async function startServer() {
  await mongoose.connect(databaseConfig.mongoUri, databaseConfig.mongooseOptions);
  console.log(`Connected to MongoDB at ${databaseConfig.mongoUri}`);
  console.log(`Using database name: ${databaseConfig.dbName}`);
  return new Promise<void>((resolve) => {
    app.listen(PORT, HOST, () => {
      console.log(`Backend listening on http://${HOST}:${PORT}`);
      console.log(`API base URL: ${API_BASE_URL}`);
      resolve();
    });
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
  });
}

export default app;
