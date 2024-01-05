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
         setIdList(friendsIds) 
        props.socket.emit('set_online_status', {
            myId: user.id,
         })

    }

   

    useEffect(() => {

        if (isAuthenticated) {

            getStatus()
        }
    }, [isAuthenticated])


    useEffect(() => {

        if (isAuthenticated) {

            console.log( "see_online_status");
            props.socket.on('see_online_status', (data: any) => {
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
                user.friendList && user.friendList.map((data, index) => {
                  
                    
                    return (
                        <User index={index} user={data} idx={index + 1} onlineUserList={onlineUserList} usedFor="myFriend"

                        ></User>
                    )
                })
            }


        </div>
    )
}

export default MyFriends