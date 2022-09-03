import ActionTypes from "../constants/ActionTypes";

let initialUserProfileState = {
  loading: 0,
  data: {},
  isEdit: false,
};

let initialUserRepoState = {
  loading: 0,
  data: [],
};
let initialUserContributionState = {
  data: {},
  dailyContribution: []
};

export const userDataReducer = (state = initialUserProfileState, action) => {
  console.log("------ userDataReducer -------");
  console.log(state);
  switch (action.type) {
    case ActionTypes.FETCH_USER_DATA:
      // console.log(action.payload);
      return { ...state, data: action.payload };
    case ActionTypes.EDIT_USER_DATA:
      console.log(action.payload);
      return { ...state, isEdit: action.payload };
    default:
      return state;
  }
};

export const userRepoReducer = (state = initialUserRepoState, action) => {
  console.log("------ userRepoReducer -------");
  console.log(state);
  switch (action.type) {
    case ActionTypes.FETCH_USER_REPO:
      console.log(action.payload);
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const userContributionReducer = (state = initialUserContributionState, action) => {
  console.log("------ userContributionReducer -------");
  console.log(state);
  switch (action.type) {
    case ActionTypes.FETCH_CONTRIBUTION_DATA:
      console.log(action.payload);
      return { ...state, data: action.payload };
    case ActionTypes.SET_DAILY_CONTRIBUTION_DATA:
      console.log(action.payload);
      return { ...state, dailyContribution: action.payload };
    default:
      return state;
  }
};
