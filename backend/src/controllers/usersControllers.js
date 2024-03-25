const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { _id } = req.body;

  try {
    // Check if a user with the given ID already exists
    let user = await User.findOne({ _id });

    // If a user with the given ID doesn't exist, create a new user
    if (!user) {
      user = await User.create({ _id });
      res.status(201).json(user);
    } else {
      // If a user with the given ID exists, respond with the existing user data
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBoards = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // res.status(201).json({ message: "Received Boards" });
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // const boards = user.boards;
    res.status(200).json(user.boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBoard = async (req, res) => {
  const user_id = req.params.user_id;
  const board_id = req.params.board_id;

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(board_id);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json([board]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBoard = async (req, res) => {
  // const user_id = req.user._id;
  const user_id = req.params.user_id;
  // console.log("Incoming edit board request:", req.params);

  try {
    // const board = await Board.create({ ...req.body, user_id });
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Destructure the board data from the request body
    const { name, columns } = req.body;
    // Create a new board object
    const newBoard = { name, columns };
    // Push the new board to the user's boards array
    user.boards.push(newBoard);
    // Save the updated user document
    await user.save();
    res.status(200).json(newBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  const user_id = req.params.user_id;
  const board_id = req.params.board_id;

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the board to be deleted
    const boardIndex = user.boards.findIndex((board) => board._id == board_id);
    if (boardIndex === -1) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Remove the board from the user's boards array
    const deletedBoard = user.boards.splice(boardIndex, 1)[0];

    // Save the updated user document
    await user.save();

    res.status(200).json(deletedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBoard = async (req, res) => {
  const user_id = req.params.user_id;
  const board_id = req.params.board_id;

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the board by its ID within the user's boards array
    const editedBoard = user.boards.find((board) => board._id == board_id);
    if (!editedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Update the board's name and columns
    editedBoard.name = req.body.name;
    editedBoard.columns = req.body.columns;

    // Save the updated user document
    await user.save();

    res.status(200).json(editedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addTask = async (req, res) => {
  console.log("Sucessess")
  const user_id = req.params.user_id;
  const board_id = req.params.board_id;
  const { title, status } = req.body;

  try {
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.find(
      (board) => board._id.toString() === board_id
    );

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const column = board.columns.find((column) => column.name === status);

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    const newTask = {
      title: title,
      status: status,
      isRead: false,
      replies: [],
    };

    column.tasks.push(newTask);

    await user.save();

    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { user_id, board_id } = req.params;
  const { taskIndex, colIndex } = req.body;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.find(
      (board) => board._id.toString() === board_id
    );

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const column = board.columns[colIndex];

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    if (taskIndex < 0 || taskIndex >= column.tasks.length) {
      return res.status(404).json({ error: "Task not found" });
    }

    column.tasks.splice(taskIndex, 1);

    await user.save();

    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all controllers
module.exports = {
  createUser,
  getBoards,
  createBoard,
  deleteBoard,
  editBoard,
  addTask,
  deleteTask,
  getBoard,
};
