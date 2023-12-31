import React from 'react'
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import User from './User';
import { FriendInterface } from '../Interfaces/common';

const MyFriends = (props:any) => {

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
 



    return (
        <div className="users" id='users'>
            {
                user.friendList && user.friendList.map((data) => {
                    return (
                        <User user={data} usedFor="myFriend"></User>
                    )
                })
            }


        </div>
    )
}

export default MyFriends