import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://yash:root123@cluster0.bnve2yi.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


export default connectDB