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

  function compare(a, b) {
    if (a.watchers > b.watchers) {
      return -1;
    }
    if (a.watchers < b.watchers) {
      return 1;
    }
    return 0;
  }
  return async function (dispatch) {
    const userCreateRepositoryEvents = await octokit.paginate(
      "GET /users/{user}/repos",
      {
        user: "erossignon",
      }
    );
    // await octokit.request("GET /users/{user}/repos", {
    //   user: "erossignon",
    // });

    // var res = userCreateRepositoryEvents.sort(compare);
    // console.log(res);

    dispatch({
      type: ActionTypes.FETCH_USER_REPO,
      payload: userCreateRepositoryEvents.sort(compare),
    });
  };
};
