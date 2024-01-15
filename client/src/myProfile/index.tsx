import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoBack from '../AuthPage/components/GoBack';
import "./index.css"
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import { useSelector } from 'react-redux';


const MyProfile = (props: any) => {
  const { setopenSiderState } = props
  const { user } = useSelector<rootState, userInterface>((state) => state.user);
  
  return (
    <>
      <GoBack goBack={props.goBack} icon="goBack"></GoBack>

      <div style={{ width: "300px" }}>
        <h2 className='sidepanle_heading'>PROFILE</h2>
      </div>

      <div>
        <div className="profile-container">
          <img src={`https://api.multiavatar.com/${user.userName}.png`}  alt={user.userName} className="profile-image" />
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