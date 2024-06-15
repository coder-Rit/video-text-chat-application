
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
import { fileI, friendChatI, messageI } from '../../Interfaces/message';
import { updateUrl } from '../../actions/chatAction';
import '@dotlottie/react-player/dist/index.css';

//components
import LoadingFile from './Components/LoadingFile';
import FileComp from './Components/FileComp';
import MessageBox from './Components/MessageBox';
import ImageComp from './Components/ImageComp';
import { On_ReciveDeliverOut, On_chat_intitalted, On_urlUpdate } from '../../socket.io/lisnner';
import { decryptMessage } from '../../functions/cryptographer';
import ImagePlayer from '../Players/ImagePlayer';
import DeliveryStatus from './Components/DeliveryStatus';
import { emit_messageAcknowlegment } from '../../socket.io/emiters';

let optimizer: any = {

}


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
  function textMaper(data: messageI, idx: number, isIam_sender: boolean) {
    const de_msg = decryptMessage(data.msg)

    const main = <>

      <span className='msgTxt'>{de_msg}</span>
      <div>
        <div className='msgDeliveryDiv'>
          <span className='msgTime'>{formatTimeFromISOString(data.createdAt)} </span>
          {
            isIam_sender && <DeliveryStatus delivery={data.delivery} ></DeliveryStatus>
          }

        </div>



      </div>
    </>


    return <MessageBox main={main} res={isIam_sender} idx={idx}  ></MessageBox>
  }

  // map file 
  function fileMaper(data: messageI, idx: number, isIam_sender: boolean) {

    let main = <></>

    if (isIam_sender) {
      main = <>
        <FileComp For="downloadable_file" fileData={data.fileData}></FileComp>
        {data.msg !== "" && <span className='msgTxt'>{decryptMessage(data.msg)}</span>}
        <div className='msgDeliveryDiv'>
          <span className='msgTime'>{formatTimeFromISOString(data.createdAt)} </span>
          {
            isIam_sender && <DeliveryStatus delivery={data.delivery} ></DeliveryStatus>
          }

        </div>
      </>
    } else {
      if (data.fileData?.url === "") {
        main = <>
          <LoadingFile  ></LoadingFile>
        </>
      } else {
        main = <>
          <FileComp For="downloadable_file" fileData={data.fileData}></FileComp>
          {data.msg !== "" && <span className='msgTxt'>{decryptMessage(data.msg)}</span>}
          <div className='msgDeliveryDiv'>
            <span className='msgTime'>{formatTimeFromISOString(data.createdAt)} </span>
            {
              isIam_sender && <DeliveryStatus delivery={data.delivery} ></DeliveryStatus>
            }

          </div>
        </>
      }

    }

    return <MessageBox main={main} res={isIam_sender} idx={idx}   ></MessageBox>


  }

  // map images
  function imageMaper(data: messageI, idx: number, isIam_sender: boolean) {
    const main = <>
      <ImageComp fileData={data.fileData as fileI} idx={idx} ></ImageComp>
      {data.msg !== "" && <span className='msgTxt'>{decryptMessage(data.msg)}</span>}
      <div className='msgDeliveryDiv'>
        <span className='msgTime'>{formatTimeFromISOString(data.createdAt)} </span>
        {
          isIam_sender && <DeliveryStatus delivery={data.delivery} ></DeliveryStatus>
        }

      </div>
    </>

    return <MessageBox main={main} res={isIam_sender} idx={idx}   ></MessageBox>


  }

  // message dispencor based on type
  // const renderChats = () => {
  //   // Render only the last `visibleChats` number of chats
  //   return isAuthenticated && chats.map((data, idx: number) => {


  //     if (data.type === 'text') {

  //       return textMaper(data, idx);
  //     } else if (data.type === 'doc') {
  //       return fileMaper(data, idx);
  //     } else {
  //       return imageMaper(data, idx);
  //     }
  //   });
  // };

  const renderChats = () => {
    // Render only the last `visibleChats` number of chats
    return isAuthenticated && chats.map((data, idx: number) => {
      // Generate key based on type and index
      const key = `${data.type} ${data.delivery} ${idx} ${data.fileData ? data.fileData?.url : null}`;
      const isIam_sender = data.senderId === user.id

      // Check if optimized rendering is available, otherwise render as usual
      if (optimizer[key]) {
        return optimizer[key];
      } else {
        // Render chat based on its type
        if (!isIam_sender && data.delivery !== "seen") {
            emit_messageAcknowlegment({ uuidList: [data.uuid], receiverId: data.receiverId, senderId: data.senderId, next_status: "seen" })
        }

        let chatComponent;
        if (data.type === 'text') {
          chatComponent = textMaper(data, idx, isIam_sender);
        } else if (data.type === 'doc') {
          chatComponent = fileMaper(data, idx, isIam_sender);
        } else {
          chatComponent = imageMaper(data, idx, isIam_sender);
        }

        // Cache the rendered component
        optimizer[key] = chatComponent;

        return chatComponent;
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
      const chats = allChats[friendIdx];
      

      if (chats) {
        setChats(chats)
      }
    }


  }, [idx, allChats])








  return (
    <>
      {On_urlUpdate()}
      {On_ReciveDeliverOut()}
      {On_chat_intitalted()}

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
    </>

  )
}

export default ChatCard