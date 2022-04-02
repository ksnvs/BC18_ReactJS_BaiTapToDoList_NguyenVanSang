import { ADD_TASK, CHANGE_THEME } from "../types/toDoListTypes";

export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  newTask,
});

export const changeThemeAction = (newTheme) => ({
  type: CHANGE_THEME,
  newTheme,
});
