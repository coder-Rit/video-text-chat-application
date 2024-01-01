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
import { chatInit } from '../actions/chatAction';
import { allFriendsChatI, friendChatI } from '../Interfaces/message';



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


  const [userId, setuserId] = useState("")
  const userDiv = useRef<HTMLInputElement>(null)

  const [add_friend, { loading, error, data }] = useMutation(ADD_FRIEND, {
    variables: {
      fid: userId,
      mid: user.id
    }
  });

  const selectFriendFunc = () => {

    Dispatch(selectFriend(props.user))


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




  return (
    <div className="user" onClick={selectFriendFunc} ref={userDiv} >
      <div className="imageDiv">
        <img src={`https://api.multiavatar.com/${props.user.userName}.png`} alt={props.user.userName} loading="lazy" />
      </div>

      {
        props.usedFor === "myFriend" && <div className="detailsDiv">
          <span>{props.user.userName}</span>
          <span>where are you bro?</span>

          <div>Online</div>

        </div>
      }
      {props.usedFor === "findUser" && <div className="detailsDiv_findUser">
        <div>

          <span>{props.user.userName}</span>
          <span>Say, 🫸 to {props.user.firstName} {props.user.lastName}</span>
          <div> </div>
        </div>

        <span onClick={() => setuserId(props.user.id)}><AddBoxIcon ></AddBoxIcon></span>

      </div>}


    </div>
  )
}

export default User