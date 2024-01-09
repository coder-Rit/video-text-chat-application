import { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";

import { CaretUpFilled } from "@ant-design/icons";

// import { MessageObject, MessageFormProps } from "react-chat-engine-advanced";

import { nowTimeStamp } from "../functions/dates";
// import { socketModule } from "../socketio";
import { useSelector } from "react-redux";
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";
import { FriendInterface } from "../Interfaces/common";
import {  fileI, friendChatI, messageI } from "../Interfaces/message";
import { useDispatch } from "react-redux";
import { appendMsg } from "../actions/chatAction";
// import { Context } from "../functions/context";
import { motion } from "framer-motion"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { extractFileType, formatBytes } from "./commonFunc";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EmojiComp from "./EmojiComp";
import SelectFileType from "./SelectFileType";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/Firebase";




const MessageForm = (props: any) => {
  const Dispatch: any = useDispatch()




  const [text, setText] = useState<string>("");
  const { socket } = props
  // const { user } = useContext(Context);
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { selectedFriend, isFriendSelected, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const AllfriendChats  = useSelector<rootState, friendChatI>((state) => state.chats);

  const [messageQ, setmessageQ] = useState<messageI>()
  const [files, setfiles] = useState<FileList | null>()
  const [fileslength, set_fileslength] = useState<number>(0)
  const [EmojiPiker, setEmojiPiker] = useState<boolean>(false)
  const [SelectFileState, setSelectFileState] = useState<boolean>(false)
  const [selectedType, setselectedType] = useState<string | null>(null)

  const [imgUrl, setImgUrl] = useState<String>("");
  const [progresspercent, setProgresspercent] = useState<number>(0);



  const uploadFiles = () => {

    if (!files) return;

    const file = files[0];

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );

  }



  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFriendSelected) return;
    const createdAt = new Date().toISOString()


    // for text
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
    // for files
    if (files) {
      const fileArray = []
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];

        let tempFile: fileI = {
          url: "",
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

      socket.emit('send_msg', msg)
      setfiles(null)
      setText("")

    }


    uploadFiles()



    const chatboardRef = props.chatboard.current;

    if (chatboardRef) {
      chatboardRef.scrollTop = chatboardRef.scrollHeight;
    }


  };




  const storeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setfiles(e.target.files);


    }
  }





  const viewFileBeforeSend = (files: FileList): ReactNode => {



    let filesData = []




    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const tempObj: any = {
        name: file["name"],
        IconScr: null,
        size: file["size"]
      }


      if (selectedType === "file") {
        tempObj.IconScr = extractFileType(file["type"])

      } else if (selectedType === "photos") {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = async function () {
          tempObj.IconScr = await reader.result
        }

      }

      filesData.push(tempObj)
    }



    const node = <motion.div className="viewFileBeforeSend_body"
      initial={{ opacity: 0, x: 250 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: .2,
      }}
    >

      <span className="RemoveCircleOutlineIcon" onClick={() => setfiles(null)}>
        <CloseIcon></CloseIcon>
      </span >

      <div className="viewFileBeforeSend" id="viewFileBeforeSend" >

        {
          filesData.map((data, index) => {
            return (
              <div className={`FileDisplay FileDisplay_Specific  ${data.IconScr} `}>

                <span className="RemoveCircleOutlineIcon" onClick={() => removeFile(index)} >

                  <RemoveCircleOutlineIcon sx={{ fontSize: "13px" }} ></RemoveCircleOutlineIcon>
                </span>


                <img className='fileIcone' src={data.IconScr} alt="" />

                <div className='fileDetails'>
                  <span>{data.name}</span>
                  <div className='filesTechnical'>
                    <span>{data.IconScr}</span>
                    <span style={{ textAlign: "right" }}>{formatBytes(data.size)}</span>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>


    </motion.div>

    return node

  }



  function removeFile(idx: number) {

    if (files) {
      let fileArr = Array.from(files)
      fileArr.splice(idx, 1)
      let tempObj: any = Object.assign({ length: fileArr.length }, fileArr)
      console.log(tempObj);
      setfiles(tempObj);
    }

  }


  useEffect(() => {

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


    })

    return () => socket.off('receive_message');
  }, [socket, AllfriendChats])


  useEffect(() => {

    if (messageQ) {
      console.log(AllfriendChats);
      
        Dispatch(appendMsg(AllfriendChats, selectedFriend.id as string, messageQ))

    }

  }, [messageQ])



  useEffect(() => {
    if (isAuthenticated && idx
    ) {
      let data = {
        senderId: user.id,
        receiverId: selectedFriend.id,
        state: "typing"
      }
      if (text !== "") {
        socket.emit("is_typing_started", data)
      } else {
        data.state = selectedFriend.lastSeen
        socket.emit("is_typing_started", data)
      }
    }
  }, [text])



  useEffect(() => {
    if (files) {

      set_fileslength(files.length)
    }
  }, [files])



  useEffect(() => {

    if (files && fileslength > 0) {
      setSelectFileState(false)
    } else {
      setselectedType(null)

    }

  }, [files, fileslength])

 
  

  return (

    <>


      <motion.form onSubmit={onSubmit}
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          repeatType: 'reverse', // Reverse the animation on each repeat
          ease: 'easeInOut', // You
        }}
        className="msgForm"
      >

        {files && fileslength > 0 && viewFileBeforeSend(files)}
        {SelectFileState && <SelectFileType storeFile={storeFile} setselectedType={setselectedType} setSelectFileState={setSelectFileState}></SelectFileType>}

        {EmojiPiker && <EmojiComp text={text} setText={setText} setEmojiPiker={setEmojiPiker}></EmojiComp>}
        <div className="chat__conversation-panel">
          <div className="chat__conversation-panel__container">




            {/* <label className="lable">
              <input type="file" hidden multiple onChange={storeFile} />
              <div className="btn-up iconStyle"><AddCircleIcon></AddCircleIcon></div>
            </label> */}


            <div className="btn-up iconStyle" onClick={() => setSelectFileState(true)}><AddCircleIcon></AddCircleIcon></div>


            <div className="iconStyle" onClick={() => setEmojiPiker(true)}><EmojiEmotionsIcon></EmojiEmotionsIcon></div>




            <input value={text} onChange={(e) => setText(e.target.value)} className="chat__conversation-panel__input panel-item"
              placeholder="Type a message..." />
            <button
              type="submit"
              className="chat__conversation-panel__button panel-item btn-icon send-message-button"><svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" data-reactid="1036">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg></button>
          </div>
        </div>


      </motion.form>
    </>

  );
};

export default MessageForm;
