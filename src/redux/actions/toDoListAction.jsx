import { ADD_TASK } from "../types/toDoListTypes";

export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  newTask,
});
