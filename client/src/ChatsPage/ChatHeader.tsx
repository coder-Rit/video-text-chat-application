import React, { useEffect, useState } from 'react'
import { FriendInterface } from '../Interfaces/common';
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { motion } from "framer-motion"
import { typingInter } from "../Interfaces/common";
import { userInterface } from '../Interfaces/user';
const ChatHeader = (props: any) => {

  const { selectedFriend, isFriendSelected } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


  const [lastSeenState, setlastSeenState] = useState("")

  function getLastSeenTimeString(miliDate: string): string {

    const inputDate = new Date(parseInt(miliDate));

    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);

    const isToday = inputDate.toDateString() === currentDate.toDateString();
    const isYesterday = inputDate.toDateString() === yesterdayDate.toDateString();

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const timeString = inputDate.toLocaleTimeString('en-US', options);

    if (isToday) {
      return `Last seen ${timeString}`;
    } else if (isYesterday) {
      return `Last seen yesterday ${timeString}`;
    } else {
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const dateString = inputDate.toLocaleDateString('en-US', dateFormatOptions);
      return `Last seen on ${dateString} at ${timeString}`

    }
  }



  useEffect(() => {
    props.socket.on('is_typing_started', (data: typingInter) => {
      if (data.senderId !== user.id) {
        if (data.state === "online" || data.state === "typing") {
          setlastSeenState(data.state)
        } else {
          setlastSeenState(getLastSeenTimeString(selectedFriend.lastSeen))
        }

      }
    })

  }, [props.socket])


  useEffect(() => {
    let data = {
      myId: user.id,
      frdId: selectedFriend.id,
      state: getLastSeenTimeString(selectedFriend.lastSeen)
    }
    props.socket.emit("get_online_status", data)
  }, [])

  useEffect(() => {
    props.socket.on("got_online_status", (data: any) => {
      setlastSeenState(data.state)
    })
  }, [props.socket])










  return (
    <>
      {
        isFriendSelected && <motion.div
          className="chat_conversation-header"
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut', // You 
          }}

        >
          <div><img className="chat_conversation-header-image" src={`https://api.multiavatar.com/${selectedFriend.userName}.png`} alt="" /></div>
          <div className="chat_conversation-header-details">
            <h3>{selectedFriend.firstName} {selectedFriend.lastName}  </h3>
            <span>
              {lastSeenState === "typing" ? <div className='typing'>
                <span></span>
                <span></span>
                <span></span>
              </div> : lastSeenState

              }


            </span>
          </div>
          <div className="chat_conversation-header-icons">
            <CallIcon sx={{ cursor: "pointer" }}></CallIcon>
            <VideoCallIcon sx={{ scale: "1.3", cursor: "pointer" }}></VideoCallIcon>
          </div>
        </motion.div>
      }

    </>

  )
}

export default ChatHeader