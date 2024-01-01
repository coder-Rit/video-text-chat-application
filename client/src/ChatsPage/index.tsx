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


const socket = io("http://localhost:4000/");


const ChatsPage = () => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { isSiderOpen } = useSelector<rootState, siderStateInterface>((state) => state.siderState);

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



      <div>

       <ChatHeader></ChatHeader>


        <div className="chat__conversation-board">
          
          <div className="chat__conversation-board__message-container">
            
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble"> <span>WE MUST FIND HIM!!</span></div>
            </div>

            <div className="chat__conversation-board__message__options"><button
              className="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg
                className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg></button>
              <button
                className="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg></button>
            </div>
          </div>
          <div className="chat__conversation-board__message-container reversed">
            
            <div className="chat__conversation-board__message__context">
              <div className="chat__conversation-board__message__bubble"> <span>WE MUST FIND HIM!!</span></div>
            </div>

            <div className="chat__conversation-board__message__options"><button
              className="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg
                className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg></button>
              <button
                className="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg
                  className="feather feather-more-horizontal sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg></button>
            </div>
          </div>

       
        </div>

        <MessageForm socket={socket}></MessageForm>
      </div>

    </div>
  );
};

export default ChatsPage;
