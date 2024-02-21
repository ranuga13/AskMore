import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function AddEditTaskModal({ type, device, setOpenAddEditTask }) {
  const dispatch = useDispatch;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  // const board = useSelector((state) => state.board).find(
  //   (board) => board.isActive
  // );

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    //needed code
    // if (type === "add") {
    //   dispatch(
    //     boardsSlice.actions.addTask({
    //       title,
    //       //newColIndex,
    //     })
    //   );
    // }
    setOpenAddEditTask(false); // Close the modal

    // else {
    //   dispatch(
    //     boardsSlice.actions.editTask({
    //       title,
    //       description,
    //       subtasks,
    //       status,
    //       taskIndex,
    //       prevColIndex,
    //       newColIndex,
    //     })
    //   );
    // }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown bg-[#00000080] "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown bg-[#00000080]"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Question
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            {/* Type Your Question */}
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" Type your Question ..."
          />
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
                // setIsAddTaskModalOpen(false);
                // type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? " save edit" : "Create question"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
