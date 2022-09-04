import React from "react";
import RepositoryList from "./RepositoryList";
import ActivityHeatMap from "./ActivityHeatMap";
import ContributionActivity from "./ContributionActivity";
import "./ProfileRight.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TabRepo from "./TabRepo";

const ProfileRight = () => {
  return (
    <div className="ProfileRight">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RepositoryList></RepositoryList>
              <ActivityHeatMap></ActivityHeatMap>
              {/* <ContributionActivity></ContributionActivity> */}
            </>
          }
        ></Route>
        <Route
          path="/repositories"
          element={
            <>
              <TabRepo></TabRepo>
            </>
          }
        ></Route>

      </Routes>
    </div>
  );
};

export default ProfileRight;
