const express = require("express");
const {
  createUser,
  getBoards,
  createBoard,
  deleteBoard,
  addTask,
  editBoard,
  editTask,
  deleteTask,
  editSubtask,
} = require("../controllers/usersControllers.js");

const router = express.Router();

// protects the below routes unless the user has correct auth
// router.use(requireAuth);

// create user
// api/users/createUser/:user_id
router.post("/createUser/", createUser);

// get users
// api/users/boards/:user_id
router.get("/boards/:user_id", getBoards);

// create a board
// api/users/boards/:user_id
router.post("/boards/:user_id", createBoard);

// delete a board
// api/boards/:id
router.delete("/:id", deleteBoard);

// edit a board
// api/boards/:id
router.put("/:id", editBoard);

// add a new task
// api/boards/tasks/add/:id  --this is the board's id
router.put("/tasks/add/:id", addTask);

// edit a task
// api/boards/tasks/edit/:id  --this is the board's id
router.put("/tasks/edit/:id", editTask);

// delete a  task
// api/boards/tasks/delete/:id -- this is the board's id
router.put("/tasks/delete/:id", deleteTask);

// edit subtask
// api/boards/tasks/subtasks/:id --this is the board's id
router.put("/tasks/subtasks/:id", editSubtask);

module.exports = router;
