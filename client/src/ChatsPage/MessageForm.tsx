import { ChangeEvent, useContext, useEffect, useState } from "react";

import { CaretUpFilled } from "@ant-design/icons";

// import { MessageObject, MessageFormProps } from "react-chat-engine-advanced";

import { nowTimeStamp } from "../functions/dates";
// import { socketModule } from "../socketio";
import { useSelector } from "react-redux";
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";
import { FriendInterface } from "../Interfaces/common";
import { allFriendsChatI, fileI, messageI } from "../Interfaces/message";
import { useDispatch } from "react-redux";
import { appendMsg } from "../actions/chatAction";
// import { Context } from "../functions/context";
import { motion } from "framer-motion"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


const MessageForm = (props: any) => {


  const Dispatch: any = useDispatch()

  const [text, setText] = useState<string>("");
  const { socket } = props
  // const { user } = useContext(Context);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { selectedFriend, isFriendSelected, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { AllfriendChats } = useSelector<rootState, allFriendsChatI>((state) => state.chats);

  const [messageQ, setmessageQ] = useState<messageI>()
  const [files, setfiles] = useState<FileList | null>()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const createdAt = new Date().toISOString()


    if (text != "" && !files) {
      const msg: messageI = {
        msg: text,
        senderId: user.id as string,
        receiverId: selectedFriend.id as string,
        createdAt,
        type: "text"
      }
      if (isFriendSelected) {
        socket.emit('send_msg', msg)
        setText('')
      }
    }

    if (files) {
      const fileArray= []
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
         
        let tempFile :fileI = {
          file: file,
          mimeType: file.type,
          fileName: file.name,
          fileSize: file.size,
        }

        fileArray.push(tempFile)
      }
  
      const msg: messageI = {
        msg: text,
        senderId: user.id as string,
        receiverId: selectedFriend.id as string,
        createdAt,
        type: "file",
        fileData: fileArray
      }
 
      if (isFriendSelected) {
        socket.emit('send_msg', msg)
        setfiles(null)
        setText("")
      }
    }




    const chatboardRef = props.chatboard.current;

    if (chatboardRef) {
      chatboardRef.scrollTop = chatboardRef.scrollHeight;
    }


  };

  const storeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setfiles(e.target.files);


    }
  }


  useEffect(() => {
    console.log("idx", idx);

    if (isAuthenticated && idx
    ) {
 
      socket.emit("startChat", {
        msg: user.userName,
        senderId: user.id,
        receiverId: selectedFriend.id,
        createdAt: new Date().toISOString,
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
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        repeatType: 'reverse', // Reverse the animation on each repeat
        ease: 'easeInOut', // You
      }}
    >

      <div className="chat__conversation-panel">
        <div className="chat__conversation-panel__container">



          <div className="file-input- ">
            <input type="file" id="fileInput" multiple onChange={storeFile} className="custom- -input" />
            <label htmlFor="fileInput" className="custom-file-label">
              <AddCircleIcon></AddCircleIcon>

            </label>


          </div>

          {/* <button
            className="chat__conversation-panel__button panel-item btn-icon add-file-button"

          >
            <input type="file" name="" id="" />
           
            


          </button>
            */}

          <div>
            <input type="file" id="fileInput" className="custom-file-input" />
            <label htmlFor="fileInput" className="custom-file-label">
              <EmojiEmotionsIcon></EmojiEmotionsIcon>

            </label>
          </div>


          <input value={text} onChange={(e) => setText(e.target.value)} className="chat__conversation-panel__input panel-item"
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
