import React from "react";
import RepositoryCard from "./RepositoryCard";
import "./RepositoryList.css";
import { useDispatch, useSelector } from "react-redux";

const RepositoryList = () => {
  const userData = useSelector((state) => state.userRepoReducer.data);
  const dispatch = useDispatch();

  console.log(userData);

  return (
    <div className="RepositoryList">
      {/* {
        userData.map((repo) => {
          return (
            <RepositoryCard
              name={repo.name}
              visibility={repo.private ? "private" : "public"}
              language={repo.language}
              description={repo.description}
            ></RepositoryCard>
          );
        })} */}
    </div>
  );
};

export default RepositoryList;
