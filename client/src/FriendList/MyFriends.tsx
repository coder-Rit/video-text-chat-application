import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import User from './User';
import { messageI } from '../Interfaces/message';
import { useDispatch } from 'react-redux';
import { chatInit } from '../actions/chatAction';
import { friendChatI } from '../Interfaces/message';
import { motion } from "framer-motion"
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoBack from '../AuthPage/components/GoBack';
import { FriendInterface } from '../Interfaces/common';







const MyFriends = (props: any) => {
    const Dispatch: any = useDispatch()

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
    const { selectedFriend, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);

  
 

    return (
        <div
            className='users'
        >
            <GoBack goBack={props.goBack} icon="goBack"></GoBack>
            <h2 className='sidepanle_heading'>MY CONTACTS</h2>
            <div className='user-list'>


                {
                    user.friendList && user.friendList.map((data, index) => {


                        return (
                            <div key={index}>

                                <User index={index} goBack={props.goBack} user={data} idx={index + 1}  usedFor="myFriend"

                                ></User>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default MyFriends