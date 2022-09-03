import React from 'react';
import { useSelector } from "react-redux";
import TabRepositoryCard from "./TabRepositoryCard";
import "./TabRepo.css";

const TabRepo = () => {
  const userData = useSelector((state) => state);
  console.log(userData);
  return (
    <div className="repository-tab-container">
      <div className="repository-tab-RepositoryList">
        {userData.userRepoReducer.data.length !== 0 ? (
          userData.userRepoReducer.data.map((repo) => {
            return (
              <TabRepositoryCard
                name={repo.name}
                visibility={repo.private ? "private" : "public"}
                language={repo.language}
                description={repo.description}
                forks={repo.forks_count}
                stars={repo.watchers}
              ></TabRepositoryCard>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default TabRepo;