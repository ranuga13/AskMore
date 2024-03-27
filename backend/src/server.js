const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const { connectToDatabase } = require("./config/db.js");
const boardsRoutes = require("./routes/users.js");

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

let connectedUserId;

io.on("connection", (socket) => {
  console.log(`A user connected with socket id ${socket.id}`);
  // const { user_id } = socket.handshake.query;
  connectedUserId = socket.handshake.query.user_id;

  socket.on("disconnect", () => {
    console.log(`A user disconnected with socket id ${socket.id}`);
  });
});

connectToDatabase()
  .then(() => {
    const User = require("./models/userModel.js");
    const changeStream = User.watch();

    changeStream.on("change", async (change) => {
      console.log("Change detected:", change);

      if (change.operationType === "update") {
        console.log("Operation type is update");

        // Convert _id to string for comparison
        const userId = change.documentKey._id.toString();
        if (userId === connectedUserId) {
          // console.log("Updated user with userid", userId, connectedUserId);
          try {
            // Fetch the updated user with userid 321 from the database
            const updatedUser = await User.findById(userId);
            console.log("Updated user:", updatedUser);

            if (updatedUser) {
              // Emit the boards data for the user with userid 321
              io.emit("change", updatedUser.boards);
              console.log("Emitted updated boards data:", updatedUser.boards);
            }
          } catch (error) {
            console.error("Error fetching updated user:", error);
          }
        }
      }
    });

    server.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error.message);
  });
