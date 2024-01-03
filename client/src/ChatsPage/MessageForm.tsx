import { useContext, useEffect, useState } from "react";

import { CaretUpFilled } from "@ant-design/icons";

// import { MessageObject, MessageFormProps } from "react-chat-engine-advanced";

import { nowTimeStamp } from "../functions/dates";
// import { socketModule } from "../socketio";
import { useSelector } from "react-redux";
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";
import { FriendInterface } from "../Interfaces/common";
import { allFriendsChatI, friendChatI, messageI } from "../Interfaces/message";
import { useDispatch } from "react-redux";
import { appendMsg } from "../actions/chatAction";
// import { Context } from "../functions/context";
import { motion } from "framer-motion"





const MessageForm = (props: any) => {


  const Dispatch: any = useDispatch()

  const [text, setText] = useState<string>("");
  const { socket } = props
  // const { user } = useContext(Context);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { selectedFriend, isFriendSelected ,idx} = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { AllfriendChats } = useSelector<rootState, allFriendsChatI>((state) => state.chats);
 
  const [messageQ, setmessageQ] = useState<messageI>( )

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const createdAt = new Date().toISOString()
    const msg = {
      msg: text,
      senderId: user.id as string,
      receiverId: selectedFriend.id as string,
      createdAt
    }
    if (isFriendSelected) {
      console.log(msg);
      
      socket.emit('send_msg', msg)
      setText('')
    }


  };


  useEffect(() => {
    console.log("idx", idx);
    
    if (isAuthenticated && idx
    ) {

      
      
      socket.emit("startChat", {
        msg: user.userName,
        senderId: user.id,
        receiverId: selectedFriend.id,
        createdAt:new Date().toISOString
      })
    }

  }, [isAuthenticated, idx])

  useEffect(() => {

    socket.on('recive_msg', (data: messageI) => {

      setmessageQ(data)
      console.log(data);


    })

    return () => socket.off('receive_message');
  }, [socket, AllfriendChats])


  useEffect(() => {
    
    if (messageQ) {
       console.log(AllfriendChats);
      
      Dispatch(appendMsg(AllfriendChats, selectedFriend.id as string, messageQ))
    }

  }, [messageQ])







  return (
    <motion.form onSubmit={onSubmit} 
    initial={{ opacity: 0, y:150 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5 ,
      repeatType: 'reverse', // Reverse the animation on each repeat
      ease: 'easeInOut', // You 
    }}
    >

      <div className="chat__conversation-panel">
        <div className="chat__conversation-panel__container"><button
          className="chat__conversation-panel__button panel-item btn-icon add-file-button"><svg
            className="feather feather-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg></button>
          <button className="chat__conversation-panel__button panel-item btn-icon emoji-button"><svg
            className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg></button><input value={text} onChange={(e) => setText(e.target.value)} className="chat__conversation-panel__input panel-item"
            placeholder="Type a message..." />
          <button
            type="submit"
            className="chat__conversation-panel__button panel-item btn-icon send-message-button"><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true" data-reactid="1036">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg></button>
        </div>
      </div>


    </motion.form>
  );
};

export default MessageForm;
