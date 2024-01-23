import React, { useEffect, useState } from 'react'
import { FriendInterface } from '../Interfaces/common';
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { motion } from "framer-motion"
import { typingInter } from "../Interfaces/common";
import { userInterface } from '../Interfaces/user';
import useDisplay from '../hooks/useDisplay';
import { toast } from 'sonner';
const ChatHeader = (props: any) => {

  const { selectedFriend, isFriendSelected, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);


  const [lastSeenState, setlastSeenState] = useState("")
  const screenWidth: number = useDisplay().getScreenWidth()


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

    if (screenWidth <= 425) {
      return `Last seen ${timeString}`;

    }
    else if (isToday) {
      return `Last seen ${timeString}`;

    } else if (isYesterday) {
      return `Last seen yesterday ${timeString}`;
    }

    else {
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
      console.log(data.state);

      if ((data.state === "typing" || data.state === "online") && user.id === data.senderId) {
        setlastSeenState("online")
      } else {
        
        setlastSeenState(data.state)
      }


    })

  }, [props.socket])


  // useEffect(() => {
  //   if (idx) {
  //     let data = {
  //       senderId: user.id,
  //       receiverId: user.friendList[idx-1].id,
  //       state: user.friendList[idx-1].lastSeen
  //     }
  //     props.socket.emit("is_typing_started", data)
  //     console.log("sended");

  //   }

  // }, [idx])













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
              {lastSeenState === "typing" ? <div className='typing '>
                <span></span>
                <span></span>
                <span></span>
              </div> : <div className={`${lastSeenState}`}>{lastSeenState}</div>

              }


            </span>
          </div>
          <div className="chat_conversation-header-icons" onClick={() => toast.warning(`Feature under development`)}>
            <CallIcon sx={{ cursor: "pointer" }}></CallIcon>
            <VideoCallIcon sx={{ scale: "1.3", cursor: "pointer" }}></VideoCallIcon>
          </div>
        </motion.div>
      }

    </>

  )
}

export default ChatHeader