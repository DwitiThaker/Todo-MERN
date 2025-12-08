import mongoose from "mongoose";

const URI = process.env.MONGODB;


const connectDb = async () => {
  try {
    await mongoose.connect(URI, { dbName: "mern_admin" });
    console.log("Connection successful");
  } catch (error) {
    console.error("Database connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
