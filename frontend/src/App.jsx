import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";
import axios from "axios";
import Loading from "./components/Loading";
import { baseURL } from "./utils/baseURL";

function App() {
  const dispatch = useDispatch();
  const { setInitialBoards } = boardsSlice.actions;

  const [loading, setLoading] = useState(true);

  const getInitialBoards = async () => {
    try {
      const response = await axios.get(`${baseURL}/boards/321`);
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

  useEffect(() => {
    if (!activeBoard && boards.length > 0) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
  }, [activeBoard, boards, dispatch]);

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className=" overflow-hidden overflow-x-scroll">
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
