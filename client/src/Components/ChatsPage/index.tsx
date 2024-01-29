
//packages
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"
import { toast } from "sonner";
import { useLazyQuery } from "@apollo/client";

//utils
import "../../theme.css";
import { userInterface } from "../../Interfaces/user";
import { rootState } from "../../Interfaces";
import { FriendInterface } from "../../Interfaces/common";
import { chatInit } from "../../actions/chatAction";
import { messageI } from "../../Interfaces/message";
import { GET_CHATS } from "../../graphQL/chats/query";

//components
import MessageForm from "./MessageForm";
import ChatHeader from "./ChatHeader";
import DefaultCart from "./Components/DefaultCart";
import ChatCard from "./ChatCard";
import { io } from "socket.io-client";
import useDisplay from "../../hooks/useDisplay";




const SCROLL_THRESHOLD = 100


const socket = io("http://localhost:4000/");


const ChatsPage = ( ) => {

  // hooks
  const chatboard = useRef<HTMLDivElement>(null)
  const screenWidth: number = useDisplay().getScreenWidth()
  const Dispatch: any = useDispatch()
  
  // states
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
 

    // queries
    const [getChats, { data }] = useLazyQuery(GET_CHATS, {
      onCompleted: (data) => {
        Dispatch(chatInit(data.getChats.friendId as string, data.getChats.chats as messageI[]))
  
      },
    })
  


  // get online 
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     let friendsIds = user.friendList?.map(data => data.id)
  //     props.socket.emit('set_online_status', {
  //       myId: user.id,
  //       friendsIds
  //     })
  //   }
  // }, [isAuthenticated])

  

  // load chats as selected user change
  useEffect(() => {
    if (idx) {
      getChats({
        variables: {
          friendId: user.friendList[idx - 1].id,
          myId: user.id,
          load: SCROLL_THRESHOLD
        }
      })
    }
  }, [idx])
  

  // toast(login)
  useEffect(() => {

    if (sessionStorage.getItem('login') === "true") {
      toast.success("Log In Successful")
    }

  }, [])



  return (
    <>


      {
        isAuthenticated && idx && <motion.div
          className="chatSection"
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 2,
            ease: 'easeInOut', // You 
          }}
        >

          <ChatHeader socket={socket}                      ></ChatHeader>
          <ChatCard socket={socket} chatboard={chatboard}></ChatCard>
          <MessageForm socket={socket} chatboard={chatboard}></MessageForm>

        </motion.div>
      }

      {
        isAuthenticated && !idx &&
        <DefaultCart key="exit"></DefaultCart>
      }


    </>

  );
};

export default ChatsPage;
