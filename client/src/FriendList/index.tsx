import React, { useEffect, useRef, useState } from 'react'
import User from "./User";
import FindUser from './FindUser';
import MyFriends from './MyFriends';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MyProfile from '../myProfile';
import PeopleIcon from '@mui/icons-material/People';
import GoBack from '../AuthPage/components/GoBack';
import useDisplay, { useDisplayI } from '../hooks/useDisplay';
import { motion } from "framer-motion";
import { FriendInterface } from '../Interfaces/common';
import { rootState } from '../Interfaces';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { chatInit } from '../actions/chatAction';
import { messageI } from '../Interfaces/message';





const GET_CHATS = gql`
query GetChats($friendId: ID) {
  getChats(friendId: $friendId) {
    friendId
    chats {
      senderId
      receiverId
      msg
      createdAt
      id
      fileData {
        mimeType
        fileSize
        fileName
        url
      }
      type
    }
  }
}
`



const FriendsPannel = (props: any) => {


    const { selectedFriend, isFriendSelected } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);



    const Dispaly: useDisplayI = useDisplay()
    const Dispatch: any = useDispatch()


    const { socket } = props

    const profile = useRef<HTMLDivElement>(null)
    const friends = useRef<HTMLDivElement>(null)
    const addFriend = useRef<HTMLDivElement>(null)
    const index = useRef<HTMLDivElement>(null)

    const [openSiderState, setopenSiderState] = useState<string>("friends")


    const [getChats, { data }] = useLazyQuery(GET_CHATS, {
        onCompleted: (data) => {
            Dispatch(chatInit(data.getChats.friendId as string, data.getChats.chats as messageI[]))
        },
    })





    function setActiveClass(active: any, ...deactive: any) {


        active.current?.classList.add("active")
        active.current?.classList.remove("deactive")

        for (let i = 0; i < deactive.length; i++) {
            const element = deactive[i];
            element.current?.classList.remove("active")
            element.current?.classList.add("deactive")
        }

    }

    useEffect(() => {

        switch (openSiderState) {
            case "addFriend":
                setActiveClass(addFriend, friends, profile, index)
                break;
            case "profile":
                setActiveClass(profile, friends, addFriend, index)
                break;
            case "friends":
                setActiveClass(friends, addFriend, profile, index)
                break;
            case "index":
                setActiveClass(index, addFriend, profile, friends)
                break;
            default:


                break;
        }

    }, [openSiderState])



    useEffect(() => {

        if (selectedFriend) {
            getChats({
                variables: {
                    friendId: selectedFriend.id
                }
            })
        }

    }, [selectedFriend])


    return (
        <>

            {/* {
                openSiderState === "friends" && <div className="addFriendDiv" style={{ left: openSiderState === "friends" ? "70px" : "-600px" }}   >
                    <MyFriends socket={socket} goBack={setopenSiderState}></MyFriends>
                </div>
            } 
            {
                openSiderState === "addFriend" && <div className="addFriendDiv" style={{ left: openSiderState === "addFriend" ? "70px" : "-600px" }}   >
                    <FindUser goBack={setopenSiderState}></FindUser>
                </div>
            } 
            {
                openSiderState === "profile" && <div className="addFriendDiv" style={{ left: openSiderState === "profile" ? "70px" : "-600px" }}   >
                    <MyProfile goBack={setopenSiderState}></MyProfile>
                </div>
            } */}


            {
                openSiderState === "profile" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 70 }}
                    transition={{
                        duration: 0.2,

                    }}   >
                    <MyProfile goBack={setopenSiderState}></MyProfile>
                </motion.div>
            }

            {
                openSiderState === "friends" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 70 }}
                    transition={{
                        duration: 0.2,

                    }}
                >
                    <MyFriends socket={socket} goBack={setopenSiderState}></MyFriends>
                </motion.div>
            }

            {
                openSiderState === "addFriend" && <motion.div className="addFriendDiv"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 70 }}
                    transition={{
                        duration: 0.2,

                    }}
                >
                    <FindUser goBack={setopenSiderState}></FindUser>
                </motion.div>
            }






            <div className="grid-item">
                <div className="sidepanle">
                    <div className='sidepanle_btns'>
                        <div ref={profile} className='zInxex2' onClick={() => setopenSiderState("profile")}><PersonIcon></PersonIcon></div>
                        <div ref={friends} className='zInxex2' onClick={() => setopenSiderState("friends")}><PeopleIcon></PeopleIcon></div>
                        {
                            Dispaly.getScreenWidth() < 1000 && <div ref={index} className='zInxex2' onClick={() => setopenSiderState("index")}><GoBack goBack={setopenSiderState} icon="message"></GoBack></div>
                        }
                        <div ref={addFriend} className='zInxex2' onClick={() => setopenSiderState("addFriend")} ><PersonAddIcon></PersonAddIcon></div>
                        <div className='deactive zIndex2'><SettingsIcon></SettingsIcon></div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default FriendsPannel 