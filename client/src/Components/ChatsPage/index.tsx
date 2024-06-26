
//packages
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"
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
import ImagePlayer from "../Players/ImagePlayer";




const SCROLL_THRESHOLD = 100




const ChatsPage = (props: any) => {

  // hooks
  const chatboard = useRef<HTMLDivElement>(null)
  const Dispatch: any = useDispatch()

  // states
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


  // queries
  const [getChats, { data }] = useLazyQuery(GET_CHATS, {
    fetchPolicy: 'no-cache', // Disables caching
    onCompleted: (data) => {
      Dispatch(chatInit(data.getChats.friendId as string, data.getChats.chats as messageI[]))
    },
  })




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








  return (
    <>

      <ImagePlayer></ImagePlayer>

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

          <ChatHeader                        ></ChatHeader>
          <ChatCard chatboard={chatboard}></ChatCard>
          <MessageForm chatboard={chatboard}></MessageForm>

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
