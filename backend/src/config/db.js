import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');

  mongoose.set('strictQuery', true);

  // Helpful logs
  mongoose.connection.on('connected', () => console.log('Mongoose connected'));
  mongoose.connection.on('error', (err) => console.error('Mongoose error:', err?.message));
  mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

  // Fail quickly if DB not reachable
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  // Extra sanity ping
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log('MongoDB ping ok');
};
