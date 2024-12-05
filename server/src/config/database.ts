import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGO_URI as string;

const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0);
  });
};

export default dbConnect;
