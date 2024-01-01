import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import User from './User';
import { allfriendsTriI, messageI } from '../Interfaces/message';
import { useDispatch } from 'react-redux';
import { chatInit } from '../actions/chatAction';
import { friendChatI } from '../Interfaces/message';

const MyFriends = (props: any) => {
    const Dispatch: any = useDispatch()

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


    // useEffect(() => {

    //     if (isAuthenticated) {
    //         let allFriendChats: friendChatI[] = []
    //         user.friendList?.map(data => {

    //             const currentObj = {
    //                 friendId: data.id as string,
    //                 chats: []
    //             }

    //             allFriendChats.push(currentObj)

    //         })

    //         Dispatch(chatInit(allFriendChats))

    //     }
    // }, [isAuthenticated])

    useEffect(() => {

        if (isAuthenticated) {
            let allFriendChats: allfriendsTriI = {}
            user.friendList?.map(data => {

                const currentObj = {
                    [data.id as string]:[]
                }

                allFriendChats ={
                    ...allFriendChats,
                    ...currentObj
                }

            })

            Dispatch(chatInit(allFriendChats))

        }
    }, [isAuthenticated])



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