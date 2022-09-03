import { Octokit } from "octokit";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DisplayWrapper from "./components/DisplayWrapper/DisplayWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserData,
  fetchUserRepo,
  fetchUserContributionData,
} from "./redux/actions/Actions";

// class Commits {
//   constructor(sha, date) {
//     this.sha = sha;
//     this.date = date;
//   }
// }

// class UserActivityByRepo extends Commits {
//   constructor(id, name, created_at, commits, commitURL, noOfCommits) {
//     super(commits);
//     this.id = id;
//     this.name = name;
//     this.created_at = created_at;
//     this.commitURL = commitURL;
//     this.noOfCommits = noOfCommits;
//   }

//   show() {
//     console.log(
//       " id: " + this.id,
//       " name: " + this.name,
//       " created_at: " + this.created_at,
//       "commits: " + this.commits,
//       "commitURL: " + this.commitURL,
//       "noOfCommits: " + this.noOfCommits
//     );
//   }
// }

function App() {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserRepo());
    dispatch(fetchUserContributionData());
  }, []);

  // console.log(userData);

  let repoMappedCommitsByMonth = {};

  const getCommitsByMonth = async (month) => {
    //creation of repository, creation of main branch

    //calculate for each month+year - 1. number of repositories created, 2. commits done
    const userCommitEvents = await octokit.paginate(
      "GET /users/{user}/events/public",
      {
        user: "amrutapalo",
      },
      (response) =>
        response.data.filter(
          (event) =>
            (event.type === "PushEvent" &&
              event.payload.ref === "refs/heads/main" &&
              new Date(event.created_at).getMonth() + 1 === month) ||
            (event.type === "CreateEvent" &&
              event.payload.master_branch === "main" &&
              new Date(event.created_at).getMonth() + 1 === month)
        )
    );

    console.log(userCommitEvents);

    for (let commitEvent of userCommitEvents) {
      // console.log(commitEvent.payload.commits[0].message);
      if (commitEvent.type === "CreateEvent") {
        if (commitEvent.repo.name in repoMappedCommitsByMonth) {
          repoMappedCommitsByMonth[commitEvent.repo.name] =
            repoMappedCommitsByMonth[commitEvent.repo.name] + 1;
        } else {
          repoMappedCommitsByMonth[commitEvent.repo.name] = 1;
        }
      } else {
        if (commitEvent.repo.name in repoMappedCommitsByMonth) {
          repoMappedCommitsByMonth[commitEvent.repo.name] =
            repoMappedCommitsByMonth[commitEvent.repo.name] +
            commitEvent.payload.commits.length;
        } else {
          repoMappedCommitsByMonth[commitEvent.repo.name] =
            commitEvent.payload.commits.length;
        }
      }

      // totalCommitsPerMonth =
      //   totalCommitsPerMonth + commitEvent.payload.commits.length;

      // console.log(
      //   // totalCommitsPerMonth,
      //   " - ",
      //   commitEvent.repo.name,
      //   "-",
      //   commitEvent.type,
      //   // commitEvent.payload.commits[0].message,
      //   "-",
      //   commitEvent.payload.ref
      // );
    }
    console.log(repoMappedCommitsByMonth);
    // console.log(totalCommitsPerMonth);
  };

  const getNewRepositoriesByMonth = async (month) => {
    const userCreateRepositoryEvents = await octokit.paginate(
      "GET /users/{user}/events",
      {
        user: "amrutapalo",
      },
      (response) =>
        response.data.filter(
          (event) =>
            event.type === "CreateEvent" &&
            event.payload.ref_type === "repository" &&
            new Date(event.created_at).getMonth() + 1 === month
        )
    );

    for (let createRepoEvent of userCreateRepositoryEvents) {
      // if (new Date(createRepoEvent.created_at).getMonth() + 1 == 8) {
      //   console.log(
      //     createRepoEvent.created_at,
      //     " commitEvent month:",
      //     new Date(createRepoEvent.created_at).getMonth() + 1
      //   );
      //   totalCreateRepositoriesPerMonth = totalCreateRepositoriesPerMonth + 1;
      //   console.log(totalCreateRepositoriesPerMonth);
      // }
      // console.log(
      //   createRepoEvent.type,
      //   " ",
      //   createRepoEvent.payload.ref,
      //   " ",
      //   createRepoEvent.payload.master_branch,
      //   " ",
      //   createRepoEvent.repo.name
      // );
    }

    console.log(userCreateRepositoryEvents);
  };

  const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });

  const getData = async () => {
    const userData = await octokit.request("GET /users/{username}", {
      username: "amrutapalo",
    });

    // const userCommitEvents = await octokit.paginate(
    //   "GET /users/{user}/events/public",
    //   {
    //     user: "amrutapalo",
    //   },
    //   (response) =>
    //     response.data.filter(
    //       (event) => new Date(event.created_at).getFullYear() === 2022
    //     )
    // );

    // console.log(userCommitEvents);
    // console.log(typeof new Date(userCommitEvents[0].created_at).getFullYear());

    // getCommitsByMonth(9);
    // getNewRepositoriesByMonth(8);
  };

  // getData();

  // console.log(userData.userData);

  return (
    <div className="App">
      <div className="env-container">
        <NavBar></NavBar>
        <DisplayWrapper></DisplayWrapper>
      </div>
    </div>
  );
}

export default App;
