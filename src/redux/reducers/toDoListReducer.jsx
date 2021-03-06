import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../types/toDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [],
  taskEdit: {},
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
    case UPDATE_TASK: {
      if (action.taskName.trim() == "") {
        alert(`Task name is empty. Please fill task name !`);
        return { ...state };
      }
      let indexName = cloneTaskList.findIndex(
        (task) => task.taskName === action.taskName
      );
      if (indexName !== -1) {
        alert(`Task name already exist !`);
        return { ...state };
      }
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
      let index = cloneTaskList.findIndex(
        (task) => task.id === state.taskEdit.id
      );
      if (index !== -1) {
        cloneTaskList[index] = state.taskEdit;
      }
      state.taskEdit = { ...state.taskEdit, id: -1, taskName: ``, done: false };
      return { ...state, taskList: cloneTaskList };
    }
    default:
      return { ...state };
  }
};
