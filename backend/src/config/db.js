const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://AskMoreTest:AskMoreTest123@askmoretest.8nb2gel.mongodb.net/AskMoreTest?retryWrites=true&w=majority&appName=AskMoreTest"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

module.exports = { connectToDatabase };
