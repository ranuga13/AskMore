import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-down.svg";
import iconUp from "../assets/icon-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import ShareModal from "../modals/ShareModal";

import { useClerk } from "@clerk/clerk-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const { user } = useClerk();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const ellipsisRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ellipsisRef.current && !ellipsisRef.current.contains(event.target)) {
        setIsElipsisOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const setOpenShareModal = () => {
    setIsShareModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoardType("add");
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-8 w-8" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans pb-2">
            askmore
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20  ">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className=" button hidden md:block "
          >
            + Add New Question
          </button>
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className=" button py-1 px-3 md:hidden "
          >
            +
          </button>
          <div>
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
          <img
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
            ref={ellipsisRef}
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
          />

          {isElipsisOpen && (
            <ElipsisMenu
              setOpenShareModal={setOpenShareModal}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Boards"
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropDown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          //type is required near onSubmit()
          type="add"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type={boardType}
        />
      )}

      {isShareModalOpen && (
        <ShareModal setIsShareModalOpen={setIsShareModalOpen} />
      )}
    </div>
  );
}

export default Header;
