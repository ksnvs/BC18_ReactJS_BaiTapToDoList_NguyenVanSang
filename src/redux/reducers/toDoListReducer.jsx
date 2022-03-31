import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ADD_TASK } from "../types/toDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  tastList: [
    { id: 1, taskName: `task 1`, done: true },
    { id: 2, taskName: `task 2`, done: false },
    { id: 3, taskName: `task 3`, done: true },
    { id: 4, taskName: `task 4`, done: false },
    { id: 5, taskName: `task 5`, done: true },
  ],
};

export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state };

    default:
      return { ...state };
  }
};
