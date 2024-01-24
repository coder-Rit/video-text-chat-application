
//packeges
import { Toaster } from 'sonner'

//utile
import useDisplay from '../hooks/useDisplay';


//components
import FriendsPannel from "./sidePanel/index";
import ChatsPage from './ChatsPage'
import { io } from 'socket.io-client';


const socket = io("http://localhost:4000/");


const Main = () => {

    const screenWidth: number = useDisplay().getScreenWidth()

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="--dark-theme" id="chat">
                {
                    screenWidth > 650 && <FriendsPannel socket={socket} ></FriendsPannel>
                }
                <ChatsPage socket={socket}></ChatsPage>
                {
                    screenWidth <= 650 && <FriendsPannel socket={socket} ></FriendsPannel>
                }

            </div>

        </>
    )
}

export default Main