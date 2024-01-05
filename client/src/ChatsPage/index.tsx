import { useContext, CSSProperties, useRef, useState, useEffect } from "react";

import valley from "../assets/valley.jpeg";

import "../theme.css";
import { useSelector } from "react-redux";
import { userInterface } from "../Interfaces/user";
import { redirect, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../actions/userActions";
import { rootState } from "../Interfaces";
import FriendsPannel from "../FriendList/index";
import { CLOSE_SIDER, OPEN_SIDER } from "../constants/userConstants";
import { FriendInterface, siderStateInterface } from "../Interfaces/common";
import MessageForm from "./MessageForm";
import { io } from "socket.io-client";
import ChatHeader from "./ChatHeader";
import ChatCard from "./ChatCard";
import { allFriendsChatI } from "../Interfaces/message";
import DefaultCart from "./DefaultCart";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"




const socket = io("http://localhost:4000/");


const ChatsPage = () => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { isSiderOpen } = useSelector<rootState, siderStateInterface>((state) => state.siderState);

  const { AllfriendChats } = useSelector<rootState, allFriendsChatI>((state) => state.chats);
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);

  const chatboard = useRef<HTMLDivElement>(null)


  const [openSider, setopenSider] = useState(false)
  let sider = useRef(null)
  let navigate = useNavigate();
  const Dispatch: any = useDispatch()
  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  } as CSSProperties;



  const opentheSider = () => {
    Dispatch({ type: OPEN_SIDER })

  }










  return (
    <div className="--dark-theme" id="chat">




      <FriendsPannel socket={socket}></FriendsPannel>



      {
        isAuthenticated && idx && <motion.div

          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 2,
            ease: 'easeInOut', // You 
          }}
        >

          <ChatHeader socket={socket}></ChatHeader>

          <ChatCard chatboard={chatboard}></ChatCard>


          <MessageForm socket={socket} chatboard={chatboard}></MessageForm>

        </motion.div>
      }

      <AnimatePresence mode="wait">

        {
          isAuthenticated && !idx &&
          <DefaultCart key="exit"></DefaultCart>
        }
      </AnimatePresence>




    </div>
  );
};

export default ChatsPage;
