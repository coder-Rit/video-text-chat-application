import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoBack from '../AuthPage/components/GoBack';
import "./index.css"
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import { useSelector } from 'react-redux';
import ProfileImage from '../AuthPage/components/ProfileImage';
import { goBackI } from '../Interfaces/common';

 

const MyProfile = (props: goBackI) => {
  const { goBack } = props
  const { user } = useSelector<rootState, userInterface>((state) => state.user);
  
  return (
    <>
      <GoBack goBack={goBack} icon="backIcon"></GoBack>

      <div  >
        <h2 className='sidepanle_heading'>PROFILE</h2>
      </div>

      <div> 
        <div className="profile-container">
        <ProfileImage url={user.profileImageURL} username={user.userName} className='profile-image'></ProfileImage>
          <h1 className="profile-name">{user.userName}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-fullname">{user.firstName+" "+ user.lastName}</p>
          <p className="profile-Friends">{user.friendList.length+1} friends</p>
        </div>
      </div>
    </>
  )
}

export default MyProfile