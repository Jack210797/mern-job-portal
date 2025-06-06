import mongoose from 'mongoose'

// Function to connect to the MongoDD database

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('MongoDB connected'))

  await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB
