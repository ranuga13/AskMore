const mongoose = require("mongoose");

// Task schema
const replySchema = new mongoose.Schema({
  reply: {
    type: String,
  },
});

// Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  replies: [{ type: replySchema }],
});

// Column schema
const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [{ type: taskSchema }],
});

// Board schema
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  columns: [{ type: columnSchema }],
});

// Board model
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
