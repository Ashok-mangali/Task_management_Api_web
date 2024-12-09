require('dotenv').config();

const mongoose = require("mongoose");


const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("Connecting to MongoDB with URI:", uri);

  if (!uri) {
    console.error("Error: MONGO_URI is not defined. Please check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
