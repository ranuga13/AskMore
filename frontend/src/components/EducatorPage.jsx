import React from "react";
import Header from "./Header";
import Center from "./Center";
import EmptyBoard from "./EmptyBoard";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function MainContent() {
  // const { user } = useUser();
  // const userID = user.id;
  const userID = "user_2da3cJPTyo2uhdBwGKXPmn7bXsu";

  const { userId, boardId } = useParams();
  const dispatch = useDispatch();
  const { setInitialBoards } = boardsSlice.actions;

  const [loading, setLoading] = useState(true);

  const getInitialBoards = async () => {
    try {
      const response = await axios.get(`${baseURL}/boards/${userID}`);
      dispatch(setInitialBoards(response.data));
    } catch (error) {
      console.error("Error fetching initial boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitialBoard = async (userId, boardId) => {
    try {
      const response = await axios.get(
        `${baseURL}/boards/${userId}/${boardId}`
      );
      dispatch(setInitialBoards(response.data));
    } catch (error) {
      console.error("Error fetching initial board:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && boardId) {
      // console.log("userId", userId, "boardId", boardId);
      getInitialBoard(userId, boardId);
    } else {
      getInitialBoards();
      // console.log("userId", userId, "boardId", boardId);
    }
  }, [userId, boardId]);

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  useEffect(() => {
    if (!activeBoard && boards.length > 0) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
  }, [activeBoard, boards, dispatch]);

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className="main-content">
      {loading ? (
        <Loading />
      ) : boards.length > 0 ? (
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
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default MainContent;
