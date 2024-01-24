//packages

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

//utils
import { rootState } from '../../Interfaces';
import { User, userInterface } from '../../Interfaces/user';
import { BulkChatInit } from '../../actions/chatAction';
import { friendChatI } from '../../Interfaces/message';
import { FriendInterface } from '../../Interfaces/common';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { LOAD_ALL_CHATS } from '../../graphQL/chats/query';

//components
import GoBack from '../../Components/AuthPage/components/GoBack';
import UserElement from './components/User';








const MyFriends = (props: any) => {

    const Dispatch: any = useDispatch()

    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
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
 



    //calling chats
    useEffect(() => {
        if (isAuthenticated && user.friendList) {
            const friendIds = user.friendList.map(data => data.id)
            loadInitialChats({
                variables: {
                    friendIds,
                    myId:user.id
                }
            })
        }
    }, [isAuthenticated])




    return (
        <div
            className='users'
        >
            <GoBack goBack={props.goBack} icon="backIcon"></GoBack>
            <h2 className='sidepanle_heading'>MY CONTACTS</h2>
            <div className='user-list'>


                {
                    user.friendList && user.friendList.length !== 0 && user.friendList.map((data: User, index) => {


                        return (
                            <div key={index}>
                                <UserElement index={index} goBack={props.goBack} lastMsg={allChats[data.id as string]} user={data} idx={index + 1} usedFor="myFriend"
                                ></UserElement>
                            </div>
                        )
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
                        <button onClick={()=>props.goBack('addFriend')}>Add Some Friends</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default MyFriends