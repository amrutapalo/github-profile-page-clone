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


Date.prototype.minusDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

export const fetchUserContributionData = () => {
  console.log("---- fetchUserContributionData");
  let fromDate = new Date().minusDays(365);
  // ${fromDate}

  let mm = String(fromDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let dd = String(fromDate.getDate()).padStart(2, "0");
  let yyyy = fromDate.getFullYear();
  fromDate = yyyy + "-" +mm + "-" + dd;

  return async function (dispatch) {
    let username = "erossignon";
    const headers = {
      Authorization: `bearer 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`,
    };
    const body = {
      query: `query {
            user(login: "${username}") {
              name
              contributionsCollection(from: "2021-09-05T23:05:23Z", to: "2022-09-05T23:05:23Z") {
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