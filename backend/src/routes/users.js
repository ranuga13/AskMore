const express = require("express");
const {
  createUser,
  getBoards,
  createBoard,
  deleteBoard,
  addTask,
  editBoard,
  deleteTask,
  getBoard,
  markCompleted,
} = require("../controllers/usersControllers.js");

const router = express.Router();

// create user
// api/users/createUser/
router.post("/createUser/", createUser);

// get users
// api/users/boards/:user_id
router.get("/boards/:user_id/:board_id", getBoard);

// get users
// api/users/boards/:user_id
router.get("/boards/:user_id", getBoards);

// create a board
// api/users/boards/:user_id
router.post("/boards/:user_id", createBoard);

// delete a board
// api/boards/:user_id/:board_id
router.delete("/boards/:user_id/:board_id", deleteBoard);

// edit a board
// api/users/boards/:user_is/:id
router.put("/boards/:user_id/:board_id", editBoard);

// add a new task
// api/users/tasks/add/:user_id/:board_id
//router.put("/tasks/add/:id", addTask);

router.put("/tasks/add/:user_id/:board_id", addTask);

// delete a  task
// api/users/tasks/delete/:user_id/:board_id
router.put("/tasks/delete/:user_id/:board_id", deleteTask);

// mark task as completed
// api/boards/:user_id/:board_id
router.put("/tasks/complete/:user_id/:board_id", markCompleted);

module.exports = router;
