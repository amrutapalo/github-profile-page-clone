import React from 'react';
import RepositoryList from './RepositoryList';
import ActivityHeatMap from './ActivityHeatMap';
import ContributionActivity from './ContributionActivity';
import './ProfileRight.css';

const ProfileRight = () => {
  return (
    <div className="ProfileRight">
      <RepositoryList></RepositoryList>
      <ActivityHeatMap></ActivityHeatMap>
      <ContributionActivity></ContributionActivity>
    </div>
  )
}

export default ProfileRight;