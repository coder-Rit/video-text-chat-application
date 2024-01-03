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


const GET_CHATS = gql`
query GetChats($idList: [ID]) {
  getChats(idList: $idList) {
    friendId
    chats {
      senderId
      receiverId
      msg
      createdAt
      id
      fileData {
        mimeType
        fileSize
        fileName
        file
      }
      type
    }
  }
}
`




const MyFriends = (props: any) => {
    const Dispatch: any = useDispatch()

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


    const [onlineUserList, setonlineUserList] = useState({
        gotStatus: false,
        statusLine: []
    })

    const [idList, setIdList] = useState<any>(null)

    const [getChats, { loading, data, error }] = useLazyQuery(GET_CHATS, {
        variables: {
            idList
        }
    })


    function intialValueFiller() { 

        Dispatch(chatInit(data.getChats))
    }

    function getStatus() {

        let friendsIds = user.friendList?.map(data => data.id)
        console.log(friendsIds);
        setIdList(friendsIds)

        props.socket.emit('set_online_status', {
            myId: user.id,
            friendsIds: friendsIds
        })

    }

    function isOnline(id: string): string {

        const res = onlineUserList.statusLine.findIndex(data => data === id)
        if (res === -1) {
            return "offline"
        } else {
            return "online"
        }
    }

    useEffect(() => {

        if (isAuthenticated) {

            getStatus()
        }
    }, [isAuthenticated])


    useEffect(() => {

        if (isAuthenticated) {

            props.socket.on('online_status_avil', (data: any) => {
                console.log(data);
                setonlineUserList({
                    gotStatus: true,
                    statusLine: data
                })

            })
        }

    }, [isAuthenticated, props.socket])


    useEffect(() => {
        if (idList) {
            getChats()

        }
    }, [idList])


    useEffect(() => {
     
         
        if (data) {
            intialValueFiller()
            
        }
    }, [data])
    





    return (
        <div className="users" id='users'

        >
            {user.firstName}
            {
                user.friendList && onlineUserList.gotStatus && user.friendList.map((data, index) => {
                    return (
                        <User user={data} idx={index + 1} status={isOnline(data.id as string)} usedFor="myFriend"

                        ></User>
                    )
                })
            }


        </div>
    )
}

export default MyFriends