//packages

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

//utils
import { rootState } from '../../Interfaces';
import { User, userInterface } from '../../Interfaces/user';
import { BulkChatInit } from '../../actions/chatAction';
import { friendChatI } from '../../Interfaces/message';
import { FriendInterface, sidePanle_I } from '../../Interfaces/common';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { GET_USER_STATUS, LOAD_ALL_CHATS } from '../../graphQL/chats/query';

//components
import GoBack from '../../Components/AuthPage/components/GoBack';
import { FriendComp } from './components/User';




const MyFriends = (props: sidePanle_I) => {

    const Dispatch: any = useDispatch()
    const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
    const allChats = useSelector<rootState, friendChatI>((state) => state.chats);

    const [friendList, setfriendList] = useState<(string | undefined)[]>([])

    const [loadInitialChats, { data: chatData }] = useLazyQuery(LOAD_ALL_CHATS, {
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

    const [GetOnlineStatus, { data: statusData, loading, error }] = useLazyQuery(GET_USER_STATUS)




    //calling chats
    useEffect(() => {
        if (isAuthenticated && user.friendList) {
            let isAlreadyFetched = true;
            for (let i = 0; i < user.friendList.length; i++) {
                const element = user.friendList[i].id as string;
                if (allChats[element]) {
                    isAlreadyFetched = false
                    break;
                }
            }

            if (isAlreadyFetched) {
                const friendIds = user.friendList.map(data => data.id)
                setfriendList(friendIds)
                loadInitialChats({
                    variables: {
                        friendIds,
                        myId: user.id
                    }
                })
            }
        }
    }, [isAuthenticated])



    // useEffect(() => {
    //     if (idx && friendList) {
    //         GetOnlineStatus({
    //             variables: {
    //                 ids: friendList
    //             },
    //             fetchPolicy: 'no-cache',
    //         })
    //     }
    // }, [idx, friendList])

    // useEffect(() => {
    //     if (statusData) {
    //         Dispatch(updateUsersStatus(statusData.getOnlineStatus, user))
    //     }
    // }, [statusData])



    return (
        <div className='users' >
            <GoBack goBack={props.goBack} icon="backIcon"></GoBack>
            <h2 className='sidepanle_heading'>MY CONTACTS</h2>
            <div className='user-list'>


                {
                    user.friendList &&
                    user.friendList.length !== 0 &&
                    user.friendList
                        .filter(data => allChats[data.id as string] && data.lastSeen) // Filter out friends without last message or.lastSeen
                        .sort((a, b) => {
                            // Sort friends based on.lastSeen or any other relevant criteria
                            return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
                        })
                        .map((data: User, index) => {
                            const friendLastMsg = allChats[data.id as string];
                            if (!friendLastMsg) return null; // Skip rendering if last message not available

                            return (
                                <div key={index}>
                                    <FriendComp
                                        index={index}
                                        goBack={props.goBack}
                                        lastMsg={friendLastMsg}
                                        user={data}
                                    />
                                </div>
                            );
                        })
                }


                {
                    (!user.friendList || user.friendList.length === 0) && <div
                        className='Add_Friends_Lottie_Box'
                    >
                        <DotLottiePlayer
                            src="./images/addFriends.lottie"
                            autoplay
                            loop
                            style={{ width: "300px" }}
                            speed={1.5}
                        >
                        </DotLottiePlayer>
                        <button onClick={() => props.goBack('addFriend')}>Add Some Friends</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default MyFriends