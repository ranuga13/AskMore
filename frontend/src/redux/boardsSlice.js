import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import data from "../data/data.json";
import { baseURL } from "../utils/baseURL.js";

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (boardData) => {
    // Send a POST request to the backend API to create a new board
    const response = await axios.post(`${baseURL}/boards/321`, boardData);
    // console.log("Response from createBoard:", response.data);

    // Return the newly created board data from the response
    return response.data;
  }
);

export const editBoard = createAsyncThunk(
  "boards/editBoard",
  async ({ user_id, board_id, boardData }) => {
    try {
      // Send a PUT request to update the board
      const response = await axios.put(
        `${baseURL}/boards/${user_id}/${board_id}`,
        boardData
      );
      // console.log("Data:", boardData);
      console.log("Response from editBoard:", response.data);

      // Return the edited board data from the response
      return response.data;
    } catch (error) {
      console.error("Error editing board:", error);
      throw error;
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async ({ user_id, board_id }) => {
    try {
      // Send a DELETE request to delete the board
      const response = await axios.delete(
        `${baseURL}/boards/${user_id}/${board_id}`
      );
      console.log("Response from deleteBoard:", response.data);

      // Return the deleted board data from the response
      return response.data;
    } catch (error) {
      console.error("Error deleting board:", error);
      throw error;
    }
  }
);

// Function to add a task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ user_id, board_id, boardData }) => {
    try {
      // Make a PUT request to add the task
      const response = await axios.put(
        `${baseURL}/tasks/add/${user_id}/${board_id}`,
        boardData
      );

      // Return the added task data from the response
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    setInitialBoards: (state, action) => {
      // Set the initial state with the fetched data
      return action.payload;
    },
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createBoard.fulfilled, (state, action) => {
  //       state.push(action.payload);
  //     })
  //     .addCase(createBoard.rejected, (state, action) => {
  //       console.log("Error creating board:", action.error.message);
  //     });
  // },
});

export default boardsSlice;
