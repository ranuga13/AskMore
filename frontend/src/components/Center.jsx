import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import SideBar from "./SideBar";
import { useClerk,useUser } from '@clerk/clerk-react';

// import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom"


function Center(boardModalOpen, setBoardModalOpen) {
  const { id,board_id } = useParams();

  // const navigate = useNavigate()
  // const { user } = useClerk();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive == true);
  // console.log("text", board)
  // navigate(`/${user.id}/${board._id}`)
  // const columns = board.columns;
  const columns = board?.columns || [];
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });



  return (
    <div
      className={
        windowSize[0] >= 768 & isSideBarOpen & useUser().isSignedIn
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#2d2d30]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
    
   

      {useUser().isSignedIn && (
            <>
            {windowSize[0] >= 768 && (
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        
          )}
          </>
      )}
            
      

      {/* columns section */}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}

          {(useUser().isSignedIn) && (
            <>
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#50ccc8] transition duration-300 cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg"
          >
            +New column
          </div>
          </>
      )}
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Center;
