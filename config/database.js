const mongoose = require("mongoose");
const mongooseDB= async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
module.exports = mongooseDB;
