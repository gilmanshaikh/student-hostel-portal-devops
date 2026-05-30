import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB, { isDbConnected } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import hostelRoutes from './routes/hostelRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', (req, res, next) => {
  if (isDbConnected && mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({
    message:
      'Database not connected. Check MONGODB_URI in backend/.env and restart the backend.',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Hostel Portal API',
    database: isDbConnected ? 'connected' : 'disconnected',
  });
});

// Unknown API routes — return JSON (not HTML "Cannot GET")
app.use('/api', (req, res) => {
  res.status(404).json({
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!isDbConnected) {
      console.warn('API routes will return errors until MongoDB connects.');
    }
  });
};

startServer();
