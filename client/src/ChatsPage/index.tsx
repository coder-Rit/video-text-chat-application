import { useContext, CSSProperties } from "react";

import valley from "../assets/valley.jpeg";



import "../theme.css";
import { useSelector } from "react-redux";
import {   userInterface } from "../Interfaces/user";
import { redirect, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../actions/userActions";
import FriendsDispay from "./UserSearchDisplay";
import Sidebar from "./Sidebar";
import { rootState } from "../Interfaces";




const ChatsPage = () => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);

  let navigate = useNavigate();
  const Dispatch: any = useDispatch()

  const onSubmit = () => [

  ]


  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  } as CSSProperties;

  return (
    <div className="background-image" style={backgroundImage}>


      <div className="chat-app">
        <div className="sidebar">
          <Sidebar></Sidebar>
          <div>
          
          </div>

          <button onClick={() => {
            Dispatch(logOut())
            navigate("/")
          }}>logout</button>
        </div>

        <div className="chat-container">
          <div className="chat-header">
            <p className="friend-name">Friend 1</p>
          </div>
          <div className="chats">
          </div>
          <div className="message-input">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ChatsPage;
