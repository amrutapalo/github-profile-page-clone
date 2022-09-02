import { Octokit } from "octokit";

// const octokit = new Octokit({
//   auth: "",
// });

// const getUserData = async () => {
//   const userData = await octokit.request("GET /users/{username}", {
//     username: "amrutapalo",
//   });
//   console.log(userData);

//   return userData;
// };

// let initialUserProfileState = {};
// (async function() {
//   initialUserProfileState = await getUserData();
//   console.log(initialUserProfileState);
// })();


export const userDataReducer = (state = 0, action) => {
  console.log("------ userDataReducer -------");
  // console.log(state);
  return state;
};
