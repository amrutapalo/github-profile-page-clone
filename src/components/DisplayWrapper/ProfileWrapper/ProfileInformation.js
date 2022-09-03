import React from "react";
import { useSelector } from "react-redux";
import EditComponent from "./EditComponent";
import InformationComponent from "./InformationComponent";
import "./ProfileInformation.css";

const ProfileInformation = () => {
  const userData = useSelector((state) => state.userDataReducer.data);
  // console.log(userData);

  return (
    <div className="ProfileInformation">
      <div className="profile-image">
        <img src={userData.avatar_url} alt="avatar" />
      </div>
      <InformationComponent></InformationComponent>
      <EditComponent></EditComponent>
    </div>
  );
};

export default ProfileInformation;
