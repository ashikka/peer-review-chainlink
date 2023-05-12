import mongoose from "mongoose";

export default async function connectDB() {
  console.log("Connecting to database...");
  console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
}
