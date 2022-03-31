import { combineReducers } from "redux";
import { toDoListReducer } from "./toDoListReducer";

export const rootReducerToDoList = combineReducers({
  toDoListReducer,
});
