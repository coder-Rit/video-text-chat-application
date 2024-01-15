import React, { useEffect, useRef, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { rootState } from '../Interfaces';
import { userInterface } from '../Interfaces/user';
import { updateFriendList } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { selectFriend } from '../actions/selectAction';
import { FriendInterface } from '../Interfaces/common';

import { motion } from "framer-motion"
import useDisplay, { useDisplayI } from '../hooks/useDisplay';
import { chatInit } from '../actions/chatAction';
import { Skeleton } from '@mui/material';
import { friendChatI } from '../Interfaces/message';



const ADD_FRIEND = gql`

mutation AddFriend($fid: String!, $mid: String!) {
  addFriend(Fid: $fid, Mid: $mid) {
    friendList {
      userName
      profileImageURL
      id
      lastName
      firstName
    }
  }
}

`


const User = (props: any) => {

  const { user, isAuthenticated } = useSelector<rootState, userInterface>((state) => state.user);
  const { selectedFriend, isFriendSelected } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);
  const allChats = useSelector<rootState, friendChatI>((state) => state.chats);


  const Dispatch: any = useDispatch()
  const Display: useDisplayI = useDisplay()


  const [userId, setuserId] = useState("")
  const [lastMsg, setlastMsg] = useState<string | null>(null)
  const userDiv = useRef<HTMLInputElement>(null)

  const [add_friend, { loading, error, data }] = useMutation(ADD_FRIEND, {
    variables: {
      fid: userId,
      mid: user.id
    }
  });







  const selectFriendFunc = () => {

    Dispatch(selectFriend(props.user, props.idx))





    if (Display.getScreenWidth() < 1000) {
      props.goBack('index')
    }

  }



  useEffect(() => {
    if (userId !== "") {
      console.log(userId);


      add_friend()

    }
  }, [userId])



  useEffect(() => {

    if (data) {

      console.log(data);

      Dispatch(updateFriendList(user, data.addFriend.friendList))
    }

  }, [data])







  useEffect(() => {
    if (isFriendSelected && selectedFriend.id === props.user.id) {
      userDiv.current?.classList.add("selectedUser")
      userDiv.current?.classList.remove("deselectedUser")
    } else {
      userDiv.current?.classList.remove("selectedUser")
      userDiv.current?.classList.add("deselectedUser")

    }
  }, [selectedFriend])



  useEffect(() => {

    if (allChats) {


      let msgArr = allChats[props.user.id]

      if (msgArr) {
        if (msgArr.length !== 0) {
          const msgObject = msgArr[msgArr.length-1]
          if (msgObject.type === "text") {
            setlastMsg(msgObject.msg)
          } else {
            if (msgObject.msg !== "") {
              setlastMsg(msgObject.msg)
            } else {

              setlastMsg(msgObject.fileData?.fileName as string)
            }
          }
        } else {
          setlastMsg(`Say, 🫸 to ${props.user.firstName}`)

        }

      }



    }


  }, [allChats])




  return (
    <motion.div className="user" onClick={selectFriendFunc} ref={userDiv}

      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * props.idx,
        ease: 'easeInOut', // You 
      }}

    >
      <div className="imageDiv">
        <img src={`https://api.multiavatar.com/${props.user.userName}.png`} alt={props.user.userName} loading="lazy" />
      </div>

      {
        props.usedFor === "myFriend" && <div className="detailsDiv">
          <span>{props.user.userName}</span>

          {
            lastMsg && <span className='lastMsg'>{lastMsg}</span>
          }
          {
            !lastMsg && <Skeleton variant="text" width={200} sx={{ fontSize: '1rem', bgcolor: '#f3e5f5' }} />
          }


          {

            <div  ></div>
          }

        </div>
      }
      {props.usedFor === "findUser" && <div className="detailsDiv_findUser">
        <div >

          <span>{props.user.userName}</span>
          {/* <span> </span> */}
          <div> </div>
        </div>

        <span onClick={() => setuserId(props.user.id)}><AddBoxIcon ></AddBoxIcon></span>

      </div>}


    </motion.div>
  )
}

export default User