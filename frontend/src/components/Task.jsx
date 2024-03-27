import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal.jsx";
import { markTaskCompleted } from "../redux/boardsSlice";
import { useDispatch } from "react-redux";
import { selectActiveBoardId } from "../utils/selectors";
import { useUser } from "@clerk/clerk-react";

function Task({ taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const activeBoardId = useSelector(selectActiveBoardId);
  const { user } = useUser();
  const user_id = user?.id;

  // let completed = 0;
  // let subtasks = task.subtasks|| || [];
  // subtasks.forEach((subtask) => {
  //   if (subtask.isCompleted) {
  //     completed++;
  //   }
  // });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  // const handleToggleCompleted = () => {
  //   setIsCompleted(!isCompleted);
  // };

  const handleToggleCompleted = async () => {
    const updatedCompleted = !isCompleted; // Toggle the completed status
    setIsCompleted(updatedCompleted); // Update the local state

    // Dispatch the async thunk to update the database
    await dispatch(
      markTaskCompleted({
        user_id,
        board_id: activeBoardId,
        colIndex,
        taskIndex,
        isCompleted: updatedCompleted,
      })
    );
    console.log(
      "user_id",
      user_id,
      "boardId",
      activeBoardId,
      "colindex",
      colIndex,
      "taskIndex",
      taskIndex,
      "isCompleted",
      updatedCompleted
    );
  };

  return (
    <div>
      <div
        onDragStart={handleOnDrag}
        draggable
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#50ccc8] dark:text-white dark:hover:text-[#50ccc8] cursor-pointer "
      >
        <p
          onClick={() => {
            setIsTaskModalOpen(true);
          }}
          className={`font-bold tracking-wide ${
            isCompleted ? "line-through" : ""
          }`}
          title="Click to see question details"
        >
          {task.title}
        </p>

        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {/* {completed} of {subtasks.length} completed tasks */}
        </p>

        <label className="flex items-center mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleCompleted}
            className="mr-2 cursor-pointer"
          />
          <p className="font-bold text-xs tracking-tighter text-gray-500">
            {isCompleted ? "Responded" : "Mark as Responded"}
          </p>
        </label>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
