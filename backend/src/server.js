const express = require("express");
const { connectToDatabase } = require("./config/db.js");

const app = express();

connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error.message);
  });
