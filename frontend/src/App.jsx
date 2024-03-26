import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import axios from "axios";
import io from "socket.io-client";
import { baseURL } from "./utils/baseURL";
import EducatorPage from "./components/EducatorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import LandingPage from "./components/landingpage/LandingPage";

function App() {
  const dispatch = useDispatch();
  const { setInitialBoards } = boardsSlice.actions;
  const { user } = useUser();
  // const userID = user.id;

  // Socket.io connection (assuming setup elsewhere)
  const socket = io("http://localhost:3000"); // Replace with your server URL

  socket.on("change", (updatedData) => {
    dispatch(setInitialBoards(updatedData));
    console.log("Updated Redux store with new data:", updatedData);
  });
  

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/session" />} />
        <Route path="/session" element={<EducatorPage />} />
        <Route path="/session/:userId/:boardId" element={<EducatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
