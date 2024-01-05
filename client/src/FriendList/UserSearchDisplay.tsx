import React, { useEffect } from 'react'
import { User as userinterf, UserListInterface } from '../Interfaces/user'
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import User from './User';



const UserSearchDisplay = (props: any) => {

 

  return (
    <div>
      {props.friendList &&
        props.friendList.map((data: userinterf) => {
          return (
            <User user={data} usedFor ={props.usedFor}></User>
          )
        })
      }

      <div className='loadingDiv'>
        {!props.loading && <div className="laoderClass" id="laoderClass">
          <span className="loader"></span>
          <span> Loading...</span>
        </div>}
      </div>
    </div>
  )
}

export default UserSearchDisplay