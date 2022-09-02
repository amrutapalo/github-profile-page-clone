import { userDataReducer, userRepoReducer } from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userDataReducer: userDataReducer,
  userRepoReducer: userRepoReducer,
});

export default rootReducer;
