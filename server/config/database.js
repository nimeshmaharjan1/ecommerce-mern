import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO);
    db.then();
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
  }
};
