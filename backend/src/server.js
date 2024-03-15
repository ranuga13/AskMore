const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const { connectToDatabase } = require("./config/db.js");
const boardsRoutes = require("./routes/users.js");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use("/api/users", boardsRoutes);

// Define a simple route
// app.get("/", (req, res) => {
//   res.send("Hello, this is the root path!");
// });

connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error.message);
  });

// app.get("/", (req, res) => {
//   res.status(201).json({ message: "connected to backend" });
// });
