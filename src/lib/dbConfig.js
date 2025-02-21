import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected successfully:", connection.connection.host);
  } catch (error) {
    console.log("Mongoose connection error: ", error);
  }
}

export default connectDB;
