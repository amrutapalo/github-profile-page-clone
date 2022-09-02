import React from "react";
import RepositoryCard from "./RepositoryCard";
import "./RepositoryList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepo } from "../../../../redux/actions/Actions";
import { useEffect } from "react";

const RepositoryList = () => {
  const userData = useSelector((state) => state);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUserRepo());
  // }, []);

  // const userData = useSelector((state) => state.userRepoReducer.data);
  // const dispatch = useDispatch();

  // console.log(userData);
  // console.log(userData.userRepoReducer.data.length);

  {
    userData.userRepoReducer.data ? (
      userData.userRepoReducer.data.map((repo) => {
        return (
          <RepositoryCard
            name={repo.name}
            visibility={repo.private ? "private" : "public"}
            language={repo.language}
            description={repo.description}
          ></RepositoryCard>
        );
      })
    ) : (
      <p>Loading...</p>
    );
  }

  if (userData.userRepoReducer.data.length !== 0) {
    console.log(userData.userRepoReducer.data);
    console.log("value");
  } else {
    console.log(userData.userRepoReducer.data);
    console.log("null");
  }

  return (
    <div className="RepositoryList">
      {userData.userRepoReducer.data.length !== 0 ? (
        userData.userRepoReducer.data.map((repo) => {
          return (
            <RepositoryCard
              name={repo.name}
              visibility={repo.private ? "private" : "public"}
              language={repo.language}
              description={repo.description}
            ></RepositoryCard>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryList;
