import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { userInterface } from '../Interfaces/user';
import { rootState } from '../Interfaces';
import { FriendInterface } from '../Interfaces/common';
import { allFriendsChatI, messageI } from '../Interfaces/message';
import { useSelector } from 'react-redux';
import Image from './Files Components/Image';
import FileComp from './Files Components/FileComp';
import { motion } from "framer-motion"
import { extractFileType } from './commonFunc';



const ChatCard = (props: any) => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { AllfriendChats } = useSelector<rootState, allFriendsChatI>((state) => state.chats);
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);


  const [chats, setChats] = useState<messageI[]>([])

  function chatBtn() {
    return (
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
    )
  }

  function formatTimeFromISOString(isoTimeString: string) {

    const date = new Date(parseInt(isoTimeString));

    const formattedTimeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    return formattedTimeString;
  }

  useEffect(() => {

    if (idx) {
      const chatInx = AllfriendChats.findIndex(data => {
        return data.friendId === user.friendList[idx - 1].id
      })

      setChats(AllfriendChats[chatInx].chats)
    }


  }, [idx])

  useLayoutEffect(() => {
    const chatboardRef = props.chatboard.current;
    if (chatboardRef) {
      console.log(chatboardRef.scrollTop);
      chatboardRef.scrollTop = chatboardRef.scrollHeight
      console.log(chatboardRef.scrollTop);
    }
  }, [AllfriendChats]);


  function textMaper(data: messageI) {


    return (
      <div className={data.senderId === user.id ? "chat__conversation-board__message-container reversed" : "chat__conversation-board__message-container"}>

        <div className="chat__conversation-board__message__context">
          <div className="chat__conversation-board_message_box">
            <span className='msgTxt'>{data.msg}</span>
            <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
          </div>
        </div>

        {chatBtn()}

      </div>

    )
  }


  function fileMaper(data: any) {

     const mapData = data.fileData?.map((fileData: any) => {

      const uint8Array = new Uint8Array(fileData.file.data);
      const newblob = new Blob([uint8Array], { type: fileData.type })

      let ext_type = extractFileType(fileData.mimeType)

      if (ext_type === "img") {
        return <Image Blob={newblob} fileData={fileData}></Image>
      } else {
        return <FileComp Blob={newblob} fileData={fileData} imageUrl={ext_type}></FileComp>
      }


    })


    return <div className={data.senderId === user.id ? "chat__conversation-board__message-container flex_down reversed" : "chat__conversation-board__message-container flex_down"}>
      <div className="chat__conversation-board__message__context">
        <div className="chat__conversation-board_message_box">
          {mapData}
          {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
          <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
        </div>
      </div>


    </div>

  }



  return (

    <motion.div className="chat__conversation-board" id='chatboard'
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
      }}
      ref={props.chatboard}>

      {
            isAuthenticated && idx && chats.map(data => {


          if (data.type === "text") {
            return textMaper(data)
          } else {
            return fileMaper(data)
          }


        })

      }






    </motion.div>

  )
}

export default ChatCard