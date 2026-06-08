import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker backend' });
});

app.get('/api/welcome', (_req, res) => {
  res.json({ message: 'Bienvenido a OctoFit Tracker' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
