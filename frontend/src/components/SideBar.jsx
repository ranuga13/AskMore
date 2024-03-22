import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import boardIcon from "../assets/icon-board.svg";
import { Switch } from "@headlessui/react";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function SideBar({ setIsSideBarOpen, isSideBarOpen }) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const [isBoardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20`
            : `bg-[#50ccc8] dark:bg-[#2b2c37] dark:hover:bg-[#50ccc8] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          {/*Rewrite Model*/}

          {isSideBarOpen && (
            <div className=" bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl ]">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-6 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className=" dropdown-board flex flex-col h-[70vh]  justify-between overflow-y-auto">
                <div>
                  {/* Rendering "Create New Board" option */}
                  <div
                    onClick={() => {
                      setBoardModalOpen(true);
                    }}
                    className=" flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#50ccc8] px-5 py-4 hover:bg-[#635fc71a] hover:text[#50ccc8] dark:hover:bg-white"
                  >
                    <img src={boardIcon} className="h-4" />
                    <p className="text-ig font-bold">Create New Board</p>
                  </div>

                  {/* Rendering existing boards */}
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#50ccc8] dark:hover:bg-white dark:hover:text-[#50ccc8] dark:text-white ${
                        board.isActive &&
                        " bg-[#50ccc8] rounded-r-full text-white mr-8"
                      }   `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                        // console.log("board", board._id);
                      }}
                    >
                      <img src={boardIcon} className="h-4" />
                      <p className="text-ig font-bold">{board.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/*Sidebar hide/show toggle*/}

          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="flex  items-center mt-2  absolute bottom-24  text-lg font-bold  rounded-r-full hover:text-[#50ccc8] cursor-pointer mr-6 mb-0 px-6 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img
                src={hideSidebarIcon}
                className=" min-w-[20px]"
                alt="hideSidebarIcon"
              />
              {isSideBarOpen && <p> Hide sidebar </p>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-5"
            >
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal type="add" setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
}

export default SideBar;
