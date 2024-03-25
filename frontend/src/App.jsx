import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";
import axios from "axios";
import Loading from "./components/Loading";
import { baseURL } from "./utils/baseURL";
import io from "socket.io-client";
import { Routes, Route,createBrowserRouter,RouterProvider } from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom"

import { useClerk,useUser } from '@clerk/clerk-react';


function App() {
  const dispatch = useDispatch();
  const { setInitialBoards } = boardsSlice.actions;

  const [loading, setLoading] = useState(true);

  const getInitialBoards = async () => {
    try {
      const response = await axios.get(`${baseURL}/boards/321`);
      console.log(response)
      dispatch(setInitialBoards(response.data));
    } catch (error) {
      console.error("Error fetching initial boards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialBoards();
  }, []);

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
// console.log("active",activeBoard)

const navigate = useNavigate()
const { user } = useClerk();
let location = useLocation()
// console.log("first",location.pathname)


// useEffect(()=>{
//   const checkClerk = () => {
//     if (window.Clerk && activeBoard) {
//       // console.log("path",location.pathname.split("/"))
//       // let existsPath = location.pathname.split("/")[2]
//       // if (existsPath != activeBoard._id && existsPath != "") navigate(`/${user.id}/${existsPath}`)
//        navigate(`/${user.id}/${activeBoard._id}`)
//     }
//     //  else if (window.Clerk && activeBoard) {
      
//     //   navigate(`/${user.id}/${location.pathname.split("/")[2]}`)
//     // }
//   }

//   checkClerk()
// }, [activeBoard, user, navigate])

const { id,board_id } = useParams();

  useEffect(() => {
    if (!activeBoard && boards.length > 0) {
      let current = boards.find((board) => board._id == board_id)
      console.log("current", boards.indexOf(current))
      dispatch(boardsSlice.actions.setBoardActive({ index: current }));
    }
  }, [activeBoard, boards, dispatch, board_id]);

// useEffect(()=>{
//   if (isClerkLoaded) navigate(`/${user.id}/${activeBoard._id}`)
// })

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  // Socket.io connection (assuming setup elsewhere)
  const socket = io("http://localhost:3000"); // Replace with your server URL

  socket.on("change", (updatedData) => {
    // console.log("Change event received from backend:", updatedData);
    // Dispatch action to update Redux store with the entire updated data
    dispatch(setInitialBoards(updatedData));
    console.log("Updated Redux store with new data:", updatedData);
  });
  

  return (
    
    <div className=" app-container">
      {loading ? (
        <Loading /> // Use the Loading component
      ) : (
        <>
          {boards.length > 0 ? (
            <>
              {/* Header Section */}
              <Header
                boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}
              />

              {/* Center Section */}
              <Center
                boardModalOpen={boardModalOpen}
                setBoardModalOpen={setBoardModalOpen}
              />
            </>
          ) : (
            <>
              <EmptyBoard type="add" />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
