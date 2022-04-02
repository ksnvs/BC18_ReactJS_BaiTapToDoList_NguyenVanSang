import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
} from "../types/toDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: `task 1`, done: true },
    { id: 2, taskName: `task 2`, done: false },
    { id: 3, taskName: `task 3`, done: true },
    { id: 4, taskName: `task 4`, done: false },
    { id: 5, taskName: `task 5`, done: true },
  ],
  taskEdit: { id: 1, taskName: `task 1`, done: true },
};

export const toDoListReducer = (state = initialState, action) => {
  let cloneTaskList = [...state.taskList];
  switch (action.type) {
    case ADD_TASK: {
      let index = cloneTaskList.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert(`Task name already exist !`);
        return { ...state };
      }
      if (action.newTask.taskName.trim() === "") {
        alert(`Task name is empty. Please fill task name !`);
        return { ...state };
      }
      cloneTaskList.push(action.newTask);
      state.taskList = cloneTaskList;
      return { ...state };
    }
    case CHANGE_THEME: {
      let themeObj = arrTheme.find((theme) => theme.id === action.themeId * 1);
      if (themeObj) {
        state.themeToDoList = { ...themeObj.theme };
      }
      return { ...state };
    }
    case DONE_TASK: {
      let index = cloneTaskList.findIndex(
        (task) => task.id === action.taskId * 1
      );
      if (index !== -1) {
        cloneTaskList[index].done = true;
      }

      return { ...state, taskList: cloneTaskList };
    }
    case DELETE_TASK: {
      let index = cloneTaskList.findIndex(
        (task) => task.id === action.taskId * 1
      );
      if (index !== -1) {
        cloneTaskList = cloneTaskList.filter(
          (task) => task.id !== action.taskId * 1
        );
      }
      return { ...state, taskList: cloneTaskList };
    }
    case EDIT_TASK: {
      return { ...state, taskEdit: action.task };
    }
    default:
      return { ...state };
  }
};
