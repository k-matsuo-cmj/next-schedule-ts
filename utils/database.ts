import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://root:password123@localhost:27017/next-schedule"
    );
    console.log("connectDB success");
  } catch (err) {
    console.log("connectDB error");
  }
};
export default connectDB;
