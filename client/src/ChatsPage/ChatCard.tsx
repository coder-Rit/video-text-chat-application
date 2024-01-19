import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { userInterface } from '../Interfaces/user';
import { rootState } from '../Interfaces';
import { FriendInterface } from '../Interfaces/common';
import { friendChatI, messageI } from '../Interfaces/message';
import { useSelector } from 'react-redux';
import Image from './Files Components/ImageComp';
import FileComp from './Files Components/FileComp';
import { motion } from "framer-motion"
import { extractFileType } from './commonFunc';
import { useDispatch } from 'react-redux';
import { updateUrl } from '../actions/chatAction';
import MessageBox from './Files Components/MessageBox';
import ImageComp from './Files Components/ImageComp';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';



const ChatCard = (props: any) => {
  const Dispatch: any = useDispatch()

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const allChats = useSelector<rootState, friendChatI>((state) => state.chats);
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);


  const [chats, setChats] = useState<messageI[]>([])
  const [visibleChats, setVisibleChats] = useState<number>(10);





  function formatTimeFromISOString(isoTimeString: string) {

    const date = new Date(parseInt(isoTimeString));

    const formattedTimeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    return formattedTimeString;
  }


  function textMaper(data: messageI, idx: number) {

    const main = <>
      <span className='msgTxt'>{data.msg}</span>
      <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
    </>


    return <MessageBox main={main} res={data.senderId === user.id} idx={idx} ></MessageBox>
  }

  function fileMaper(data: messageI, idx: number) {
    const main = <>
      {data.fileData?.url === "" && <span className='userIsUploading'>Uploading <span className='loadingDots dot1'>.</span><span className='loadingDots dot2'>.</span><span className='loadingDots dot2'>.</span></span>}

      <FileComp For="downloadable_file" fileData={data.fileData} ></FileComp>
      {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
      <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
    </>

    return <MessageBox main={main} res={data.senderId === user.id} idx={idx} ></MessageBox>


  }

  function imageMaper(data: messageI, idx: number) {
    const main = <>
      <ImageComp fileData={data.fileData} ></ImageComp>
      {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
      <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
    </>

    return <MessageBox main={main} res={data.senderId === user.id} idx={idx} ></MessageBox>


  }


  const handleScroll = () => {
    // You can implement logic here to check if the user has scrolled to the top
    // and then load more chats by updating the visibleChats state.
    // This is just a basic example; you might need to adjust this based on your actual UI and scroll behavior.
    if (window.scrollY === 0) {
      setVisibleChats((prevVisibleChats) => prevVisibleChats + 10);
    }
  };

  const renderChats = () => {
    // Render only the last `visibleChats` number of chats
    return isAuthenticated && chats.map((data, idx: number) => {
      if (data.type === 'text') {
        return textMaper(data, idx);
      } else if (data.type === 'doc') {
        return fileMaper(data, idx);
      } else {
        return imageMaper(data, idx);
      }
    });
  };


  useEffect(() => {

    if (idx) {
      const friendIdx = user.friendList[idx - 1].id as string
      const chats = allChats[friendIdx]

      if (chats) {
        setChats(chats)
      }
    }


  }, [idx, allChats])

  useLayoutEffect(() => {
    const chatboardRef = props.chatboard.current;
    if (chatboardRef) {
      chatboardRef.scrollTop = chatboardRef.scrollHeight
    }
  }, [chats]);

  useEffect((): any => {

    props.socket.on('RE_UPDATED_URL', (data: any) => {
      console.log("RE_UPDATED_URL");
      Dispatch(updateUrl(data, user.id as string))
    })
    return () => props.socket.off('RE_UPDATED_URL');
  }, [props.socket])











  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  return (

    <motion.div className="chat__conversation-board" id='chatboard'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
      }}
      ref={props.chatboard}>

      <div>
        {renderChats()}
      </div>

      {
        (chats.length === 0) && <div
          className='Add_Friends_Lottie_Box'
        >
          <DotLottiePlayer
            src="./images/Hello.lottie"
            autoplay
            loop
            style={{ width: "300px" }}
            speed={1.5}
          >
          </DotLottiePlayer>
          <h2 >{`Say hello to ${user.friendList[idx-1].firstName }`}</h2>
        </div>
      }


    </motion.div>

  )
}

export default ChatCard