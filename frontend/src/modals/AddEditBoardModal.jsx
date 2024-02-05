import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import boardSlices from "../redux/boardsSlice";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  const onChange = (id, newValue) => {
    setNewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((perState) => perState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; index < newColumns.length; i++) {
      if (!newColumn[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardSlices.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardSlices.actions.editBoard({ name, newColumns }));
    }
  };

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
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
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
            Board Columns
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
            className="w-full items-center hover:opacity-75 dark:text-[#50ccc8] dark:bg-white bg-[#50ccc8] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add new category
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
            {type === "add" ? "Creat New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
