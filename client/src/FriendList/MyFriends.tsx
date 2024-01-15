import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import User from './User';
import { messageI } from '../Interfaces/message';
import { useDispatch } from 'react-redux';
import { BulkChatInit, chatInit } from '../actions/chatAction';
import { friendChatI } from '../Interfaces/message';
import { motion } from "framer-motion"
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoBack from '../AuthPage/components/GoBack';
import { FriendInterface } from '../Interfaces/common';



const LOAD_ALL_CHATS = gql`
query LoadInitialChats($friendIds: [ID]) {
  loadInitialChats(friendIds: $friendIds) {
    friendId
    chats {
      type
      senderId
      receiverId
      msg
      createdAt
      fileData {
        fileName
      }
    }
  }
}
`





const MyFriends = (props: any) => {
    const Dispatch: any = useDispatch()

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
    const { selectedFriend, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
    const allChats = useSelector<rootState, friendChatI>((state) => state.chats);

    const [loadInitialChats, { data, loading, error }] = useLazyQuery(LOAD_ALL_CHATS, {
        onCompleted: ({ loadInitialChats }) => {
            let allChats = {}

            loadInitialChats.map((data: any) => {
                const { friendId, chats } = data

                if (chats.length === 0) {
                    allChats = {
                        ...allChats,
                        [friendId]: []
                    }
                } else {
                    allChats = {
                        ...allChats,
                        [friendId]: [chats[0]]
                    }
                }
            })
            Dispatch(BulkChatInit(allChats))
        }
    })



    useEffect(() => {
        if (isAuthenticated) {
            const friendIds = user.friendList.map(data => data.id)
            loadInitialChats({
                variables: {
                    friendIds
                }
            })
        }
    }, [isAuthenticated])




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

                                <User index={index} goBack={props.goBack} lastMsg={allChats[data.id as string]} user={data} idx={index + 1} usedFor="myFriend"

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