import React from "react";
import RepositoryCard from "./RepositoryCard";
import "./RepositoryList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepo } from "../../../../redux/actions/Actions";
import { useEffect } from "react";

const RepositoryList = () => {
  const userData = useSelector((state) => state);
  console.log(userData);
  return (
    <div className="repo-container">
      <h2>Popular repositories</h2>
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
    </div>
  );
};

export default RepositoryList;
