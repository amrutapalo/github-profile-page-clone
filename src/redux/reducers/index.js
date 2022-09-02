import { userDataReducer } from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    userDataReducer: userDataReducer,
});

export default rootReducer;