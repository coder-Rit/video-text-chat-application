
//packeges
import { Toaster } from 'sonner'

//utile
import useDisplay from '../hooks/useDisplay';


//components
import FriendsPannel from "./sidePanel/index";
import ChatsPage from './ChatsPage'
import { io } from 'socket.io-client';
import { useLazyQuery } from '@apollo/client';
import { GET_CHATS } from '../graphQL/chats/query';
import { chatInit } from '../actions/chatAction';
import { messageI } from '../Interfaces/message';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import { useEffect } from 'react';
import { FriendInterface } from '../Interfaces/common';


const SCROLL_THRESHOLD = 100


const Main = () => {

    const screenWidth: number = useDisplay().getScreenWidth()





    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="--dark-theme" id="chat">
                {
                    screenWidth > 650 && <FriendsPannel   ></FriendsPannel>
                }
                <ChatsPage  ></ChatsPage>
                {
                    screenWidth <= 650 && <FriendsPannel   ></FriendsPannel>
                }

            </div>

        </>
    )
}

export default Main