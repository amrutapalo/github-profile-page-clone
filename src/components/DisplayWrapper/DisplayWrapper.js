import React from 'react';
import './DisplayWrapper.css';
import StickyNavbar from './StickyNavbar';
import ProfileWrapper from './ProfileWrapper/ProfileWrapper';

const DisplayWrapper = () => {
  return (
    <div className="displayWrapper">
      <StickyNavbar></StickyNavbar>
      <ProfileWrapper></ProfileWrapper>
    </div>
  )
}
export default DisplayWrapper;