import React from 'react'
import { FriendInterface } from '../Interfaces/common';
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { motion } from "framer-motion"
const ChatHeader = () => {
  const { selectedFriend, isFriendSelected } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);

  function getLastSeenTimeString(isoTimeString: Date): string {
    const inputDate = new Date(isoTimeString);
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
      return `Last seen today at ${timeString}`;
    } else if (isYesterday) {
      return `Last seen yesterday at ${timeString}`;
    } else {
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
  
      const dateString = inputDate.toLocaleDateString('en-US', dateFormatOptions);
      return `Last seen on ${dateString} at ${timeString}`;
    }
  }

  return (
    <>
      {
        isFriendSelected && <motion.div 
        className="chat_conversation-header"
        initial={{ opacity: 0, y:-150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5 ,
           ease: 'easeInOut', // You 
        }}
        
        >
          <div><img className="chat_conversation-header-image" src={`https://api.multiavatar.com/${selectedFriend.userName}.png`} alt="" /></div>
          <div className="chat_conversation-header-details">
            <h3>{selectedFriend.firstName} {selectedFriend.lastName}  </h3>
            <span>{getLastSeenTimeString(selectedFriend.lastSeen)}</span>
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