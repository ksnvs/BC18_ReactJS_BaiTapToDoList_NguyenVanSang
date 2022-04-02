import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ADD_TASK, CHANGE_THEME } from "../types/toDoListTypes";

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
  let cloneTaskList = [...state.tastList];
  switch (action.type) {
    case ADD_TASK: {
      console.log(`todo: `, action.newTask);
      cloneTaskList.push(action.newTask);
      state.tastList = cloneTaskList;
      return { ...state };
    }
    case CHANGE_THEME: {
      console.log(action.newTheme);
      let themeObj = arrTheme.find((theme) => theme.id == action.newTheme);
      if (themeObj) {
        state.themeToDoList = { ...themeObj.theme };
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};
