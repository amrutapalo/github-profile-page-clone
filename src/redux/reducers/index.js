import {
  userDataReducer,
  userRepoReducer,
  userContributionReducer,
} from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userDataReducer: userDataReducer,
  userRepoReducer: userRepoReducer,
  userContributionReducer: userContributionReducer,
});

export default rootReducer;
