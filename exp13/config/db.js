
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = mongoose.connection.readyState === 1;

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
