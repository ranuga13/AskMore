const Board = require("../models/boardModel");

const getBoards = async (req, res) => {
  // const user_id = req.user._id;

  try {
    res.status(201).json({ message: "Received Boards" });
    const boards = await Board.find({ user_id });
    res.status(200).json(boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBoard = async (req, res) => {
  // const user_id = req.user._id;

  try {
    // const board = await Board.create({ ...req.body, user_id });
    const board = await Board.create({ ...req.body });
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBoard = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBoard = await Board.findByIdAndDelete(id);
    res.status(200).json(deletedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBoard = async (req, res) => {
  const id = req.params.id;

  try {
    let editedBoard = await Board.findById(id);
    editedBoard.name = req.body.name; // Update the appropriate field
    editedBoard.columns = req.body.columns;
    editedBoard.save();
    res.status(200).json(editedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addTask = async (req, res) => {
  const id = req.params.id;
  const { title, status } = req.body;

  try {
    const addTaskToBoard = await Board.findOneAndUpdate(
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
      let editedTask = await Board.findOneAndUpdate(
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
      const deletedTask = await Board.findOneAndUpdate(
        { _id: id, "columns.name": req.body.originalStatus },
        { $pull: { "columns.$.tasks": { _id: req.body._id } } },
        { new: true }
      );

      // add edited task to new column
      const addTaskToBoard = await Board.findOneAndUpdate(
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
    const deletedTask = await Board.findOneAndUpdate(
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
      let editedSubtask = await Board.findOneAndUpdate(
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
      const deletedTask = await Board.findOneAndUpdate(
        { _id: id, "columns.name": req.body.originalStatus },
        { $pull: { "columns.$.tasks": { _id: req.body._id } } },
        { new: true }
      );

      // add edited task to new column
      const addTaskToBoard = await Board.findOneAndUpdate(
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
  getBoards,
  createBoard,
  deleteBoard,
  editBoard,
  addTask,
  editTask,
  deleteTask,
  editSubtask,
};
