import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
} from "../types/toDoListTypes";

export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: CHANGE_THEME,
  themeId,
});

export const doneTaskAction = (taskId) => ({
  type: DONE_TASK,
  taskId,
});

export const deleteTaskAction = (taskId) => ({
  type: DELETE_TASK,
  taskId,
});
