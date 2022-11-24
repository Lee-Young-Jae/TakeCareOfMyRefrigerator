import { combineReducers } from "redux";
import user from "./user";
import shopping from "./shopping";

const rootReducer = combineReducers({
  user,
  shopping,
});

export default rootReducer;
