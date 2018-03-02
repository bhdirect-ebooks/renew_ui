import { combineReducers } from "redux";
import app from "./AppReducer";
import account from "./AccountReducer";

export default combineReducers({
  app,
  account,
});
