import mongoose from 'mongoose';

export let isDbConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hostelhub'
    );
    isDbConnected = true;
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    isDbConnected = false;
    console.error('MongoDB connection error:', error.message);
    console.warn(
      'Set MONGODB_URI in backend/.env (MongoDB Atlas) and restart the backend.'
    );
    return false;
  }
};

export default connectDB;
