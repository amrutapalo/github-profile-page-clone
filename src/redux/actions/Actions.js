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

export const fetchUserContributionData = () => {
  console.log("---- fetchUserContributionData");
  return async function (dispatch) {
    let username = "erossignon";
    const headers = {
      Authorization: `bearer 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`,
    };
    const body = {
      query: `query {
            user(login: "${username}") {
              name
              contributionsCollection(from: "2021-12-31T23:05:23Z") {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
    };

    const data = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    const response = await data.json();
    console.log(response);
    dispatch({ type: ActionTypes.FETCH_CONTRIBUTION_DATA, payload: response});
  };
};


export const setDailyContributionData = (request) => {
  return { type: ActionTypes.SET_DAILY_CONTRIBUTION_DATA, payload: request };
};