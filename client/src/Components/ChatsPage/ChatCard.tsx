
//packages
import { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import { DotLottiePlayer } from '@dotlottie/react-player';

//utils
import { userInterface } from '../../Interfaces/user';
import { rootState } from '../../Interfaces';
import { FriendInterface } from '../../Interfaces/common';
import { friendChatI, messageI } from '../../Interfaces/message';
import { updateUrl } from '../../actions/chatAction';
import '@dotlottie/react-player/dist/index.css';

//components
import LoadingFile from './Components/LoadingFile';
import FileComp from './Components/FileComp';
import MessageBox from './Components/MessageBox';
import ImageComp from './Components/ImageComp';



const ChatCard = (props: any) => {

  // hooks
  const Dispatch: any = useDispatch()

  //state
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const allChats = useSelector<rootState, friendChatI>((state) => state.chats);
  const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);

  const [chats, setChats] = useState<messageI[]>([])




  // iso string formator
  function formatTimeFromISOString(isoTimeString: string) {

    const date = new Date(parseInt(isoTimeString));

    const formattedTimeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    return formattedTimeString;
  }

  // map text
  function textMaper(data: messageI, idx: number) {

    const main = <>
      <span className='msgTxt'>{data.msg}</span>
      <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
    </>


    return <MessageBox main={main} res={data.senderId === user.id} idx={idx} ></MessageBox>
  }

  // map file 
  function fileMaper(data: messageI, idx: number) {


    let forReceiver = data.senderId === user.id

    let main = <></>

    if (forReceiver) {
      main = <>
        <FileComp For="downloadable_file" fileData={data.fileData}></FileComp>
        {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
        <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
      </>
    } else {
      if (data.fileData?.url === "") {
        main = <>
          <LoadingFile  ></LoadingFile>
        </>
      } else {
        main = <>
          <FileComp For="downloadable_file" fileData={data.fileData}></FileComp>
          {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
          <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
        </>
      }

    }

    return <MessageBox main={main} res={forReceiver} idx={idx} ></MessageBox>


  }

  // map images
  function imageMaper(data: messageI, idx: number) {
    const main = <>
      <ImageComp fileData={data.fileData} ></ImageComp>
      {data.msg !== "" && <span className='msgTxt'>{data.msg}</span>}
      <span className='msgTime'>{formatTimeFromISOString(data.createdAt)}</span>
    </>

    return <MessageBox main={main} res={data.senderId === user.id} idx={idx} ></MessageBox>


  }

  // message dispencor based on type
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

  // scroller
  useLayoutEffect(() => {
    const chatboardRef = props.chatboard.current;
    if (chatboardRef) {
      chatboardRef.scrollTop = chatboardRef.scrollHeight
    }
  }, [chats]);

  // load chats based on user id
  useEffect(() => {

    if (idx) {
      const friendIdx = user.friendList[idx - 1].id as string
      const chats = allChats[friendIdx]

      if (chats) {
        setChats(chats)
      }
    }


  }, [idx, allChats])


  // send url to update message
  useEffect((): any => {

    props.socket.on('RE_UPDATED_URL', (data: any) => {
      Dispatch(updateUrl(data, user.id as string))
    })
    return () => props.socket.off('RE_UPDATED_URL');
  }, [props.socket])





  return (

    <motion.div className="chat__conversation-board" id='chatboard'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
      }}
      ref={props.chatboard}>

      {renderChats()}

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
          <h2 >{`Say hello to ${user.friendList[idx - 1].firstName}`}</h2>
        </div>
      }


    </motion.div>

  )
}

export default ChatCard