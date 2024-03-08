
//packages
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';

//utils
import { rootState } from "../../Interfaces";
import { userInterface } from "../../Interfaces/user";
import { FriendInterface } from "../../Interfaces/common";
import { FilesQI, fileI, fileUrl, friendChatI, headerStatusI, messageI, urlUpdateObjectI } from "../../Interfaces/message";
import { appendMsg, updateUrl } from "../../actions/chatAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";

//components
import EmojiComp from "./Components/EmojiComp";
import SelectFileType from "./Components/SelectFileType";
import { v4 as uuidv4 } from 'uuid';
import FileComp from "./Components/FileComp";
import { emit_InitChat, emit_exchangeMessage, emit_headerStatus, emit_urlUpdator } from "../../socket.io/emiters";
import { On_exchangeMessage } from "../../socket.io/lisnner";
import { encryptMessage } from "../../functions/cryptographer";



const MessageForm = (props: any) => {


  // hooks
  const Dispatch: any = useDispatch()

  //states
  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const {  isFriendSelected, idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const [text, setText] = useState<string>("");
  const [files, setfiles] = useState<FileList | null>()
  const [EmojiPiker, setEmojiPiker] = useState<boolean>(false)
  const [SelectFileState, setSelectFileState] = useState<boolean>(false)
  const [selectedType, setselectedType] = useState<'doc' | 'img' | 'text'>("text")
  const [fileUrls, setfileUrls] = useState<fileUrl[]>([]);
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [FilesQ, setFilesQ] = useState<FilesQI[]>([]);
  const [previewFileList, setpreviewFileList] = useState<any>([]);
  const [fileCaption, set_fileCaption] = useState<number>(0);

  

  //upload files
  const uploadFiles = (file: File, uuid: string) => {

    if (!file) return;

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

          let msgUpdator: urlUpdateObjectI = {
            uuid,
            senderId: user.id as string,
            receiverId: user.friendList[idx - 1].id as string,
            url: downloadURL
          }
          emit_urlUpdator(msgUpdator)
          Dispatch(updateUrl(msgUpdator, user.id as string))
        });
      }
    );

  }

  // send messages
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    if (!isFriendSelected) return;
    const createdAt = new Date().toISOString()

    // for text
    if (selectedType === "text") {



      const msg: messageI = {
        uuid: "",
        msg:   encryptMessage(text) ,
        senderId: user.id as string,
        receiverId: user.friendList[idx-1].id as string,
        createdAt,
        type: "text"
      }
      Dispatch(appendMsg(msg.receiverId as string, [msg]));
      emit_exchangeMessage([msg])

    }

    // for files 

    if (selectedType === "doc" || selectedType === "img") {

      let fileArray: any = []
      const messageArray = FilesQ.map(data => {
        fileArray.push({ file: data.bufferFile, uuid: data.msg.uuid })
        delete data.bufferFile
        data.msg.createdAt = createdAt
        return data.msg
      })

      Dispatch(appendMsg(messageArray[0].receiverId as string, messageArray));
      emit_exchangeMessage(messageArray)


      for (let i = 0; i < fileArray.length; i++) {
        const msgData: any = fileArray[i];
        uploadFiles(msgData.file as File, msgData.uuid)
      }


    }

    setfiles(null)
    setpreviewFileList([])
    setText("")




    // scorll down as we send message
    const chatboardRef = props.chatboard.current;

    if (chatboardRef) {
      chatboardRef.scrollTop = chatboardRef.scrollHeight;
    }


  };

  // sotre file to upload queue
  const storeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let files = e.target.files

      let tempFilesQ: FilesQI[] = []

      let filesData = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const tempObj: any = {
          fileName: file["name"],
          mimeType: file["type"],
          fileSize: file["size"],
          url: ""
        }

        filesData.push(tempObj)
        tempFilesQ.push(mapFilesInMessages(file))
      }

      setFilesQ(tempFilesQ)
      setpreviewFileList(filesData)

    }
  }

  // message body
  const mapFilesInMessages = (singleFile: File) => {

    let tempFile: fileI = {
      url: "",
      mimeType: singleFile.type,
      fileName: singleFile.name,
      fileSize: singleFile.size,
    }


    const msg: messageI = {
      uuid: uuidv4(),
      msg: text,
      senderId: user.id as string,
      receiverId: user.friendList[idx-1].id as string,
      createdAt: "",
      type: selectedType,
      fileData: tempFile
    }


    return {
      bufferFile: singleFile,
      msg: msg
    }

  }

  // file caption updater
  function setTextInMsg(idx: number, text: string) {
    let tempMsgObj = [...FilesQ]; // create a copy of FilesQ
    tempMsgObj[idx].msg.msg = text;
    setFilesQ(tempMsgObj);
  }

  // caption ro text
  function dynamicInputComp(fileCaption: number): ReactNode {
    if (fileCaption) {
      const cpation = FilesQ[fileCaption - 1].msg.msg;
      return (
        <input
          value={cpation}
          onChange={(e) => setTextInMsg(fileCaption - 1, e.target.value)}
          className="chat__conversation-panel__input panel-item"
          placeholder="Write a caption..."
        />
      );
    } else {
      return (
        <input
          value={text} //comes from use state
          onChange={(e) => setText(e.target.value)}
          className="chat__conversation-panel__input panel-item"
          placeholder="Type a message..."
        />
      );
    }
  }


  //remove file hanler
  function removeFile(idx: number) {

    if (files) {
      let fileArr = Array.from(files)
      let tempFileUrls = fileUrls
      fileArr.splice(idx, 1)
      tempFileUrls.splice(idx, 1)
      setfileUrls(tempFileUrls)
      let tempObj: any = Object.assign({ length: fileArr.length }, fileArr)
      setfiles(tempObj);
    }

  }


  // send message
  useEffect(() => {

    if (isAuthenticated && idx
    ) {

      emit_InitChat({
        msg: user.userName,
        senderId: user.id as string,
        receiverId: user.friendList[idx-1].id as string,
        createdAt: new Date().toISOString(),
      })
    }

  }, [isAuthenticated, idx])





  // send typing state
  useEffect(() => {
    if (isAuthenticated && idx
    ) {
      let headerStatus: headerStatusI = {
        senderId: user.id as string,
        receiverId: user.friendList[idx - 1].id as string,
        state: "typing"
      }
      if (text !== "") {
        emit_headerStatus(headerStatus)
      } else {
        headerStatus.state = user.friendList[idx - 1].lastSeen
        emit_headerStatus(headerStatus)
      }
    }
  }, [text])

  // if file not selected
  useEffect(() => {

    if (previewFileList.length > 0) {
      setSelectFileState(false)
    } else {
      setselectedType('text')
    }

  }, [previewFileList])





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

        {previewFileList.length > 0 && <motion.div className="viewFileBeforeSend_body"
          initial={{ opacity: 0, x: 250 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: .2,
          }}
        >

          <span className="RemoveCircleOutlineIcon" onClick={() => {
            setpreviewFileList([])
            set_fileCaption(0)
          }}>
            <CloseIcon></CloseIcon>
          </span >

          <div className="viewFileBeforeSend" id="viewFileBeforeSend" >
            {

              previewFileList.map((data: any, index: number) => {

                return <div key={index}>
                  <FileComp For="preview" fileData={data} removeFile={removeFile} index={index} set_fileCaption={set_fileCaption} fileCaption={fileCaption}></FileComp>
                </div>
              })
            }
          </div>




        </motion.div>}

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


            {dynamicInputComp(fileCaption)}

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
