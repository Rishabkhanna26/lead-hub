import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://rishabkhanna26:g92FdmwTY4i5tVhz@hczz4qx.mongodb.net/?appName=LeadManagement';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB successfully');
    
    // Attempt to create a test document
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    
    const doc = await TestModel.create({ name: 'test-doc' });
    console.log('Successfully saved doc:', doc);
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection();
