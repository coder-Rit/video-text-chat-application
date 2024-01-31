
//packeges
import { Toaster } from 'sonner'

//utile
import useDisplay from '../hooks/useDisplay';


//components
import FriendsPannel from "./sidePanel/index";
import ChatsPage from './ChatsPage'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import { emit_userConnected } from '../socket.io/emiters';


const Main = () => {

    const screenWidth: number = useDisplay().getScreenWidth()


    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);




    useEffect(() => {

        if (isAuthenticated) {
            emit_userConnected(user.id as string)
        }
    }, [isAuthenticated])

    



    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="--dark-theme" id="chat">
                {
                    screenWidth > 650 && <FriendsPannel   ></FriendsPannel>
                }
                <ChatsPage    ></ChatsPage>
                {
                    screenWidth <= 650 && <FriendsPannel   ></FriendsPannel>
                }

            </div>

        </>
    )
}

export default Main