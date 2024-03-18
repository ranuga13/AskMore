export const selectActiveBoardId = (state) => {
  const activeBoard = state.boards.find((board) => board.isActive);
  // console.log("Active board in selectActiveBoardId:", activeBoard._id);
  return activeBoard ? activeBoard._id : null;
};

//  // console.log("State in selectActiveBoardId:", state);
//  const activeBoard = state.boards.find((board) => board.isActive);
//  console.log("Active board in selectActiveBoardId:", activeBoard._id);
//  return activeBoard ? activeBoard.board_id : null;
