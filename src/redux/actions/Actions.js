import { Octokit } from "octokit";
import ActionTypes from "../constants/ActionTypes";

export const fetchUserData = () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });
  return async function (dispatch) {
    const response = await octokit.request("GET /users/{username}", {
      username: "erossignon",
    });

    dispatch({ type: ActionTypes.FETCH_USER_DATA, payload: response.data });
  };
};

export const editUserData = (isEdit) => {
  return { type: ActionTypes.EDIT_USER_DATA, payload: isEdit };
};

export const fetchUserRepo = () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });
  return async function (dispatch) {
    const response = await octokit.request("GET /users/{user}/repos", {
      user: "erossignon",
    });

    dispatch({ type: ActionTypes.FETCH_USER_REPO, payload: response.data });
  };
};
