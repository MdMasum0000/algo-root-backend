import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongooDB connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
