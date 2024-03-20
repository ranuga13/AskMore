const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.create({ _id });
    res.status(201).json(user);
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
  const id = req.params.id;
  const { title, status } = req.body;

  try {
    const addTaskToBoard = await User.findOneAndUpdate(
      { _id: id, "columns.name": status },
      {
        $push: {
          "columns.$.tasks": { title, status },
        },
      },
      { new: true }
    );

    res.status(200).json(addTaskToBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editTask = async (req, res) => {
  const id = req.params.id;

  if (req.body.status === req.body.originalStatus) {
    try {
      let editedTask = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { "columns.$[e1].tasks.$[e2]": req.body },
        },
        {
          arrayFilters: [
            { "e1.name": req.body.status },
            { "e2._id": req.body._id },
          ],
          new: true,
        }
      );

      res.status(200).json(editedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // different status/column
  if (req.body.status !== req.body.originalStatus) {
    try {
      // delete original task
      const deletedTask = await User.findOneAndUpdate(
        { _id: id, "columns.name": req.body.originalStatus },
        { $pull: { "columns.$.tasks": { _id: req.body._id } } },
        { new: true }
      );

      // add edited task to new column
      const addTaskToBoard = await User.findOneAndUpdate(
        { _id: id, "columns.name": req.body.status },
        { $push: { "columns.$.tasks": { ...req.body } } },
        { new: true }
      );

      res.status(200).json(addTaskToBoard);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const colName = req.body.colName;
  const taskId = req.body.taskId;

  try {
    const deletedTask = await User.findOneAndUpdate(
      { _id: id, "columns.name": colName },
      { $pull: { "columns.$.tasks": { _id: taskId } } },
      { new: true }
    );

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editSubtask = async (req, res) => {
  const id = req.params.id;

  if (req.body.status === req.body.originalStatus) {
    try {
      let editedSubtask = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "columns.$[e1].tasks.$[e2].subtasks": [...req.body.subtasks],
          },
        },
        {
          arrayFilters: [
            { "e1.name": req.body.status },
            { "e2._id": req.body._id },
          ],
          new: true,
        }
      );

      res.status(200).json(editedSubtask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // different status/column
  if (req.body.status !== req.body.originalStatus) {
    try {
      // delete original task
      const deletedTask = await User.findOneAndUpdate(
        { _id: id, "columns.name": req.body.originalStatus },
        { $pull: { "columns.$.tasks": { _id: req.body._id } } },
        { new: true }
      );

      // add edited task to new column
      const addTaskToBoard = await User.findOneAndUpdate(
        { _id: id, "columns.name": req.body.status },
        {
          $push: {
            "columns.$.tasks": {
              ...req.body.task,
              subtasks: [...req.body.subtasks],
            },
          },
        },
        { new: true }
      );

      res.status(200).json(addTaskToBoard);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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
  editTask,
  deleteTask,
  editSubtask,
};
