import { useContext, CSSProperties, useRef, useState, useEffect } from "react";

import valley from "../assets/valley.jpeg";

import "../theme.css";
import { useSelector } from "react-redux";
import { userInterface } from "../Interfaces/user";
import { redirect, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../actions/userActions";
import { rootState } from "../Interfaces";
import FriendsPannel from "../sidePanel/index";
import { CLOSE_SIDER, OPEN_SIDER } from "../constants/userConstants";
import { FriendInterface, siderStateInterface } from "../Interfaces/common";
import MessageForm from "./MessageForm";
import { io } from "socket.io-client";
import ChatHeader from "./ChatHeader";
import DefaultCart from "./DefaultCart";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"
import ChatCard from "./ChatCard";
import useDisplay, { useDisplayI } from "../hooks/useDisplay";
import { Toaster, toast } from "sonner";
import { gql, useLazyQuery } from "@apollo/client";
import { chatInit } from "../actions/chatAction";
import { messageI } from "../Interfaces/message";

 


const socket = io("http://localhost:4000/");

const SCROLL_THRESHOLD = 100

const GET_CHATS = gql`
query GetChats($friendId: ID, $myId: ID, $load: Int) {
  getChats(friendId: $friendId, myId: $myId, load: $load) {
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
        url
      }
      type
    }
  }
}

`



const ChatsPage = () => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);

  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);

  const chatboard = useRef<HTMLDivElement>(null)

  const Dispatch: any = useDispatch()
  const screenWidth: number = useDisplay().getScreenWidth()


  const [getChats, { data }] = useLazyQuery(GET_CHATS, {
    onCompleted: (data) => {
      Dispatch(chatInit(data.getChats.friendId as string, data.getChats.chats as messageI[]))
      
    },
  })


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


  useEffect(() => {
    if (isAuthenticated) {
      let friendsIds = user.friendList?.map(data => data.id)
      socket.emit('set_online_status', {
        myId: user.id,
        friendsIds
      })
    }
  }, [isAuthenticated])
  

  useEffect(() => {

    if (sessionStorage.getItem('login') === "true") {
      toast.success("Log In Successful")

    }

  }, [])



  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="--dark-theme" id="chat">

        {
          screenWidth > 650 && <FriendsPannel socket={socket} ></FriendsPannel>
        }



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

        <AnimatePresence mode="wait">

          {
            isAuthenticated && !idx &&
            <DefaultCart key="exit"></DefaultCart>
          }
        </AnimatePresence>

        {
          screenWidth <= 650 && <FriendsPannel socket={socket} ></FriendsPannel>
        }



      </div>
    </>

  );
};

export default ChatsPage;
