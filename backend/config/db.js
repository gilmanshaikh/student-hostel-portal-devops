import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Added the fallback string here using || 
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hostelhub");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn(
      'Start MongoDB locally or set MONGODB_URI in backend/.env (e.g. MongoDB Atlas).'
    );
  }
};

export default connectDB;