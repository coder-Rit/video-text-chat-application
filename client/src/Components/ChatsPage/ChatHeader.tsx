
//packages
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { motion } from "framer-motion"
import { toast } from 'sonner';

//utils
import { FriendInterface } from '../../Interfaces/common';
import { rootState } from '../../Interfaces';
import { typingInter } from "../../Interfaces/common";
import { userInterface } from '../../Interfaces/user';
import useDisplay from '../../hooks/useDisplay';
import { On_headerStatus } from '../../socket.io/lisnner';
import socket from '../../socket.io';


const ChatHeader = (props: any) => {

  // hooks
  const screenWidth: number = useDisplay().getScreenWidth()

  //state
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const [lastSeenState, setlastSeenState] = useState("")



  // last seen time sting builder
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

    socket.on("ONLINE_USER_LIST", (data:[string]) => {
      console.log(data);
      
      if (data.includes(user.friendList[idx - 1].id as string)) {
        setlastSeenState("online")
      } else {
        setlastSeenState(getLastSeenTimeString(user.friendList[idx - 1].lastSeen))
      }
    })
 
  }, [socket,idx])






  return (
    <>
      {
        On_headerStatus({ setlastSeenState })
      }
      {
        idx && <motion.div
          className="chat_conversation-header"
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut', // You 
          }}

        >
          <div><img className="chat_conversation-header-image" src={`https://api.multiavatar.com/${user.friendList[idx - 1].userName}.png`} alt="" /></div>
          <div className="chat_conversation-header-details">
            <h3>{user.friendList[idx - 1].firstName} {user.friendList[idx - 1].lastName}  </h3>
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