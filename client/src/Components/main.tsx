
//packeges
import { Toaster } from 'sonner'
import { io } from 'socket.io-client';

//utile
import useDisplay from '../hooks/useDisplay';


//components
import FriendsPannel from "./sidePanel/index";
import ChatsPage from './ChatsPage'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';


 const socket = io("http://localhost:4000/");


const Main = () => {
    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


    const screenWidth: number = useDisplay().getScreenWidth()


    useEffect(() => {

        if (isAuthenticated) {
            socket.emit('USER_CONNECTED', {
                id: user.id
            })
        }
    }, [isAuthenticated])

    const closeSocket = ()=>{
        socket.close()
    }



    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="--dark-theme" id="chat">
                {
                    screenWidth > 650 && <FriendsPannel  closeSocket={closeSocket} ></FriendsPannel>
                }
                <ChatsPage socket={socket} ></ChatsPage>
                {
                    screenWidth <= 650 && <FriendsPannel  closeSocket={closeSocket} ></FriendsPannel>
                }

            </div>

        </>
    )
}

export default Main