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
  // const AllfriendChats = useSelector<rootState, allFriendsChatI[]>((state) => state.chats);

  const Dispatch: any = useDispatch()
  const Display: useDisplayI = useDisplay()


  const [userId, setuserId] = useState("")
  const [status, setstatus] = useState("offline")
  const userDiv = useRef<HTMLInputElement>(null)

  const [add_friend, { loading, error, data }] = useMutation(ADD_FRIEND, {
    variables: {
      fid: userId,
      mid: user.id
    }
  });

  const selectFriendFunc = () => {

    Dispatch(selectFriend(props.user, props.idx))

    if (Display.getScreenWidth()<1000) {
      props.goBack('index')
    }

  }

  function isOnline(id: string): string {

    const res = props.onlineUserList.statusLine.findIndex((data: any) => data === id)
    if (res === -1) {
      return "offline"
    } else {
      return "online"
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

    if (props.onlineUserList) {

      setstatus(isOnline(props.user.id as string))


    }

  }, [props.onlineUserList])





  useEffect(() => {
    if (isFriendSelected && selectedFriend.id === props.user.id) {
      userDiv.current?.classList.add("selectedUser")
      userDiv.current?.classList.remove("deselectedUser")
    } else {
      userDiv.current?.classList.remove("selectedUser")
      userDiv.current?.classList.add("deselectedUser")

    }
  }, [selectedFriend])




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
          <span>where are you bro?</span>

          {

            <div className={status} >{status}</div>
          }

        </div>
      }
      {props.usedFor === "findUser" && <div className="detailsDiv_findUser">
        <div>

          <span>{props.user.userName}</span>
          {/* <span>Say, 🫸 to {props.user.firstName} {props.user.lastName}</span> */}
          <div> </div>
        </div>

        <span onClick={() => setuserId(props.user.id)}><AddBoxIcon ></AddBoxIcon></span>

      </div>}


    </motion.div>
  )
}

export default User