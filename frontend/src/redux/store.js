import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice.js";


const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  }
})

export default store