import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import boardSlices from "../redux/boardsSlice";
import { createBoard } from "../redux/boardsSlice";
import { editBoard } from "../redux/boardsSlice";
import { selectActiveBoardId } from "../utils/selectors";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const dispatch = useDispatch();

  const activeBoardId = useSelector(selectActiveBoardId);
  // console.log("activeBoardId", activeBoardId);

  const user_id = "321";
  // const board_id = "65f7e10a0ae87adbd65ecb66";

  const [newColumns, setNewColumns] = useState([
    { name: "Technical Questions", task: [], id: uuidv4() },
    { name: "Functional Questions", task: [], id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  // Get names of the columns as an array
  const columnNames = newColumns.map((column) => column.name);
  console.log(columnNames);

  const onSubmit = async (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      try {
        await dispatch(createBoard({ name, columns: newColumns }));
        dispatch(boardSlices.actions.addBoard({ name, newColumns }));
      } catch (error) {
        console.error("Error creating board:", error);
      }
    } else {
      try {
        await dispatch(
          editBoard({
            user_id,
            board_id: activeBoardId,
            boardData: { name, columns: newColumns },
          })
        );
        dispatch(boardSlices.actions.editBoard({ name, newColumns }));
      } catch (error) {
        console.error("Error editing board:", error);
      }
    }
  };

  // const onSubmit = (type) => {
  //   setBoardModalOpen(false);
  //   if (type === "add") {
  //     dispatch(boardSlices.actions.addBoard({ name, newColumns }));
  //   } else {
  //     dispatch(boardSlices.actions.editBoard({ name, newColumns }));
  //   }
  // };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-6 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Session
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Session Name
          </label>
          <input
            className=" bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#50ccc8] outline-1 ring-0"
            placeholder="e.g Machine Learning"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Session Categories
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#50ccc8]"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#50ccc8] dark:bg-white text-white bg-[#50ccc8] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Category
          </button>

          <button
            className=" w-full items-center hover:opacity-75 dark:text-White dark:bg-[#50ccc8] mt-8 relative text-white bg-[#50ccc8] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) {
                onSubmit(type);
              }
            }}
          >
            {type === "add" ? "Create New Session" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
