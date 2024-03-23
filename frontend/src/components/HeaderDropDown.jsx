import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardIcon from "../assets/icon-board.svg";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropDown({ setOpenDropdown, setBoardModalOpen }) {
  const boards = useSelector((state) => state.boards);
  // console.log("boards =", boards);
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl overflow-y-auto max-h-[50vh]">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-2 ">
          ALL SESSIONS ({boards?.length})
        </h3>

        <div className=" dropdown-board  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " bg-[#50ccc8] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p
                className={`text-lg font-bold ${darkSide ? "text-white" : ""}`}
              >
                {board.name}
              </p>
            </div>
          ))}
          <div
            className="cursor-pointer flex items-baseline space-x-2 text-[#50ccc8] px-5 py-4"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-bold  ">+ Create New Session </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
