import React, { useEffect } from 'react'
import { User, UsersList } from '../Interfaces/user'
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';


 

const UserSearchDisplay = () => {

  const { users} = useSelector<rootState,rootState>((state) => state);

  useEffect(() => {
     console.log(users);
     
  }, [users])
  
   
  return (
    <div>
      {/* {
        users.map(data=>{
          return(
            <li>{data.userName}</li>
          )
        })
      } */}
    </div>
  )
}

export default UserSearchDisplay