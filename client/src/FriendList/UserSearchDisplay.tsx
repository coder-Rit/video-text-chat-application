import React, { useEffect } from 'react'
import { User as userinterf, UserListInterface } from '../Interfaces/user'
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import User from './User';



const UserSearchDisplay = (props: any) => {

 

  return (
    < >
      {props.friendList &&
        props.friendList.map((data: userinterf,index:number) => {
          return (
            <User index={index} user={data} goBack= {props.goBack} usedFor ={props.usedFor}></User>
          )
        })
      }

        {!props.loading && <div className="laoderClass" id="laoderClass">
          <span className="loaderPersonal"></span>
          <span> Loading...</span>
        </div>}
    </ >
  )
}

export default UserSearchDisplay