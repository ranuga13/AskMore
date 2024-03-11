const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://inforaskmore:BbmNqkpVt01BKLuy@askmore.jtiidzn.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

module.exports = { connectToDatabase };
