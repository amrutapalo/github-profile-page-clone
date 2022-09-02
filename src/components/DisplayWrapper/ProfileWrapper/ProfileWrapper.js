import React from 'react';
import './ProfileWrapper.css';
import ProfileInformation from './ProfileInformation';
import ProfileRight from './ProfileRightSection/ProfileRight';

const ProfileWrapper = () => {
  return (
    <div className="ProfileWrapper">
      <ProfileInformation></ProfileInformation>
      <ProfileRight></ProfileRight>
    </div>
  )
}

export default ProfileWrapper;