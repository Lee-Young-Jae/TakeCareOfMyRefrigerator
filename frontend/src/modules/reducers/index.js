import { combineReducers } from "redux";
import user from "./user";
import shopping from "./shopping";
import frige from "./frige";

const rootReducer = combineReducers({
  user,
  shopping,
  frige,
});

export default rootReducer;
