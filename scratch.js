import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function clearCommissions() {
  await mongoose.connect(process.env.MONGODB_URI);
  await mongoose.connection.db.collection('commissions').deleteMany({});
  console.log('Cleared commissions');
  process.exit(0);
}
clearCommissions();
