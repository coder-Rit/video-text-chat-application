//packages

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ADD_FRIEND } from "../../../graphQL/user/mutation";
import { Skeleton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

//utils
import { rootState } from "../../../Interfaces";
import { userInterface } from "../../../Interfaces/user";
import { removeFriend, updateFriendList } from "../../../actions/userActions";
import { selectFriend } from "../../../actions/selectAction";
import { FriendInterface } from "../../../Interfaces/common";
import useDisplay, { useDisplayI } from "../../../hooks/useDisplay";
import { friendChatI } from "../../../Interfaces/message";
import "../index.css";

//components
import ProfileImage from "../../AuthPage/components/ProfileImage";

const User = (props: any) => {
  //hooks
  const Dispatch: any = useDispatch();
  const Display: useDisplayI = useDisplay();

  const userDiv = useRef<HTMLInputElement>(null);

  //state
  const { user } = useSelector<rootState, userInterface>((state) => state.user);
  const { selectedFriend, isFriendSelected } = useSelector<
    rootState,
    FriendInterface
  >((state) => state.selectedFriend);
  const allChats = useSelector<rootState, friendChatI>((state) => state.chats);

  const [userId, setuserId] = useState("");
  const [actionState, SetactionState] = useState<string>("");
  const [lastMsg, setlastMsg] = useState<string | null>(null);

  // queries
  const [add_friend, { loading, error, data }] = useMutation(ADD_FRIEND, {
    onError(error) {
      toast.error(error.message);
    },
  });

  // functions
  const selectFriendFunc = () => {
    Dispatch(selectFriend(props.user, props.idx));

    if (Display.getScreenWidth() < 1000) {
      props.goBack("index");
    }
  };

  const updateFriend = (userId: string, action: string) => {
    SetactionState(action);
    if (action === "Added") {
      add_friend({
        variables: {
          fid: userId,
          mid: user.id,
        },
      });
    } else {
      Dispatch(removeFriend(props.index));
      add_friend({
        variables: {
          fid: userId,
          mid: user.id,
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      toast.success(`${props.user.userName} is ${actionState}`);
      Dispatch(updateFriendList(user, data.addFriend.friendList));
    }
  }, [data]);

  useEffect(() => {
    if (isFriendSelected && selectedFriend.id === props.user.id) {
      userDiv.current?.classList.add("selectedUser");
      userDiv.current?.classList.remove("deselectedUser");
    } else {
      userDiv.current?.classList.remove("selectedUser");
      userDiv.current?.classList.add("deselectedUser");
    }
  }, [selectedFriend]);

  useEffect(() => {
    if (allChats) {
      let msgArr = allChats[props.user.id];

      if (msgArr) {
        if (msgArr.length !== 0) {
          const msgObject = msgArr[msgArr.length - 1];
          if (msgObject.type === "text") {
            setlastMsg(msgObject.msg);
          } else {
            if (msgObject.msg !== "") {
              setlastMsg(msgObject.msg);
            } else {
              setlastMsg(msgObject.fileData?.fileName as string);
            }
          }
        } else {
          setlastMsg(`Say, 🫸 to ${props.user.firstName}`);
        }
      }
    }
  }, [allChats]);

  return (
    <motion.div
      className="user"
      ref={userDiv}
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * props.index,
        ease: "easeInOut", // You
      }}
    >
      <div className="imageDiv">
        <ProfileImage
          url={props.user.profileImageURL}
          username={props.user.userName}
          className=""
        ></ProfileImage>
      </div>

      {props.usedFor === "myFriend" && (
        <div className="detailsDiv" onClick={selectFriendFunc}>
          <span>{props.user.userName}</span>

          {lastMsg && <span className="lastMsg">{lastMsg}</span>}
          {!lastMsg && (
            <Skeleton
              variant="text"
              width={200}
              sx={{ fontSize: "1rem", bgcolor: "#f3e5f5" }}
            />
          )}
          {<div></div>}
        </div>
      )}
      {props.usedFor === "findUser" && (
        <div className="detailsDiv_findUser">
          <div>
            <span>{props.user.userName}</span>
            <div> </div>
          </div>

          <span onClick={() => setuserId(props.user.id)}>
            {user.friendList.filter(
              (data: any) => data.id === props.user.id
            )[0] ? (
              <span
                className="squareIcones icone-red"
                onClick={() => updateFriend(props.user.id, "Removed")}
              >
                <RemoveIcon></RemoveIcon>
              </span>
            ) : (
              <span
                className="squareIcones icone-white"
                onClick={() => updateFriend(props.user.id, "Added")}
              >
                <AddIcon></AddIcon>
              </span>
            )}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default User;
