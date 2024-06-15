import { Button } from "@mui/material";
import "./index.css";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { selectMessage, selectNotMessage } from "../../actions/selectAction";
import { rootState } from "../../Interfaces";
import { FriendInterface, selectMessageI } from "../../Interfaces/common";
import { fileI, friendChatI } from "../../Interfaces/message";
import { useEffect, useState } from "react";
import { userInterface } from "../../Interfaces/user";
import { motion } from "framer-motion";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { decryptMessage } from "../../functions/cryptographer";
const ImagePlayer = () => {

    const Dispatch = useDispatch()

    const { messageIndex, isMessageSlected } = useSelector<rootState, selectMessageI>((state) => state.selecteMessage);
    const allChats = useSelector<rootState, friendChatI>((state) => state.chats);
    const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);

    const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);



    const [localFileData, setlocalFileData] = useState<fileI>()
    const [currentCaption, set_currentCaption] = useState<string>("")
    const [currentMessageIndex, set_currentMessageIndex] = useState<number>(messageIndex)


    const dispath_CloseMessage = () => {
        Dispatch(selectNotMessage())
    }

    const helper = (val: number) => {
        if (allChats[user.friendList[idx - 1].id as string][val].type === "img") {
            set_currentMessageIndex(val)
            set_currentCaption(allChats[user.friendList[idx - 1].id as string][val].msg)
            setlocalFileData(allChats[user.friendList[idx - 1].id as string][val].fileData)
            return true
        }
        return false
    }


    const searchLeft = () => {
        let current = currentMessageIndex;

        while (current > 0) {
            current--;
            if (helper(current)) {
                break;
            }
        }
    }
    const searchRight = () => {
        let current = currentMessageIndex;
        while (current < allChats[user.friendList[idx - 1].id as string].length - 1) {
            current++;
            if (helper(current)) {
                break;
            }
        }
    }




    useEffect(() => {

        if (isMessageSlected) {
            set_currentMessageIndex(messageIndex)
            set_currentCaption(allChats[user.friendList[idx - 1].id as string][messageIndex].msg)
            setlocalFileData(allChats[user.friendList[idx - 1].id as string][messageIndex].fileData)
        }

    }, [messageIndex])

    useEffect(() => {

        window.addEventListener("keydown", (event) => {
            if ((event as KeyboardEvent).keyCode === 38) {
                searchLeft()
            }
            if ((event as KeyboardEvent).keyCode === 39) {
                searchRight()
            }
        })
    }, [window])





    return (

        isMessageSlected ? <motion.div className="image-player-div"
        initial={{ opacity: 0, scaleX: 0.8, scaleY:0.8 }}
        animate={{ opacity: 1, scaleX: 1, scaleY:1  }}
        transition={{
          duration: 0.1,
          ease: "easeInOut", // You
        }}
        >

            <div className="image-player-button-div">
                <div></div>
                <CloseIcon onClick={dispath_CloseMessage} className="image-player-colse-icone"  ></CloseIcon>

            </div>
            <div className="image-player-image-div">
                <div className="image-player-fileName">{localFileData?.fileName} </div>
                <img className="image-player-image" src={localFileData?.url} alt="" />
            </div>
            <div className="image-player-contro-caption">
                <h4 className="image-player-Imagecaption">{decryptMessage(currentCaption)}</h4>
                <div className="image-player-contro-div">
                    <div><ChevronLeftIcon fontSize="large" onClick={searchLeft} className="pointer"></ChevronLeftIcon></div>
                    <div><ChevronRightIcon fontSize="large" onClick={searchRight} onKeyDown={searchRight} className="pointer" ></ChevronRightIcon></div>
                </div>
            </div>
        </motion.div> : <></>
    )
}

export default ImagePlayer