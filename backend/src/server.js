const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const { connectToDatabase } = require("./config/db.js");
const boardsRoutes = require("./routes/users.js");
// const User = require("./models/User.js");

const app = express();

app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use("/api/users", boardsRoutes);

io.on("connection", (socket) => {
  console.log(`A user connected with socket id ${socket.id}`);
  const { user_id } = socket.handshake.query; // Extract user_id from query params

  socket.on("disconnect", () => {
    console.log(`A user disconnected with socket id ${socket.id}`);
  });

  // Use user_id to listen for changes specific to that user
  const User = require("./models/userModel.js");
  const changeStream = User.watch({ fullDocument: "updateLookup" });

  changeStream.on("change", async (change) => {
    console.log("Change detected:", change);

    if (change.operationType === "update") {
      console.log("Operation type is update");

      // Convert _id to string for comparison
      const userId = change.fullDocument._id.toString();
      if (userId === user_id) {
        console.log(`Updated user with user id ${user_id}`);
        try {
          // Fetch the updated user from the database
          const updatedUser = await User.findById(userId);
          console.log("Updated user:", updatedUser);

          if (updatedUser) {
            // Emit the boards data for the updated user
            io.emit("change", updatedUser.boards);
            console.log("Emitted updated boards data:", updatedUser.boards);
          }
        } catch (error) {
          console.error("Error fetching updated user:", error);
        }
      }
    }
  });
});

connectToDatabase()
  .then(() => {
    server.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error.message);
  });
