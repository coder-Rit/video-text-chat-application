import { useDispatch } from "react-redux";
import socket from "."
import { SET_DELIVERY_STATUS_I, messageI } from "../Interfaces/message";
import { appendMsg, updateDeliveryStatus, updateUnseenChatToSeen, updateUrl } from "../actions/chatAction";
import { useEffect, useState } from "react";
import { FriendInterface, typingInter } from "../Interfaces/common";
import { useSelector } from "react-redux";
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";
import { emit_messageAcknowlegment } from "./emiters";



export const On_exchangeMessage = () => {
    const Dispatch: any = useDispatch()

    useEffect((): any => {
        socket.on('recive_msg', (data: messageI[]) => {

            Dispatch(appendMsg(data[0].senderId as string, data));
            // console.log(data[0].senderId);

            let Ack_data = data.map((m) => m.uuid)
            console.log("Ack_data",Ack_data);
            
              emit_messageAcknowlegment({ uuidList: Ack_data,receiverId: data[0].receiverId, senderId: data[0].senderId,next_status: "unseen" })
        })
        return () => socket.off('recive_msg');
    }, [socket])


    return <></>
}


export const On_ReciveDeliverOut = () => {
    const Dispatch: any = useDispatch()

    useEffect((): any => {
        socket.on('DELIVERY_OUT', (data:SET_DELIVERY_STATUS_I) => {
            // console.log(data);
            
            
            Dispatch(updateDeliveryStatus(data));
        })
        return () => socket.off('DELIVERY_OUT');
    }, [socket])


    return <></>
}
export const On_chat_intitalted = () => {
    const { user } = useSelector<rootState, userInterface>((state) => state.user);
    const Dispatch: any = useDispatch()

    useEffect((): any => {
        socket.on('CHAT_INITIATED', (data:messageI) => { 

            if (data.receiverId === user.id) {
                 
            // Dispatch(updateUnseenChatToSeen(data.senderId));

            }

        })
        return () => socket.off('CHAT_INITIATED');
    }, [socket])


    return <></>
}



export const On_headerStatus = ({ setlastSeenState }: { setlastSeenState: (str: string) => void }) => {
    const { user } = useSelector<rootState, userInterface>((state) => state.user);
    const { idx } = useSelector<rootState, FriendInterface>((state) => state.selectedFriend);


    useEffect(() => {
        socket.on('is_typing_started', (data: typingInter) => {
            if (user.id !== data.senderId) {
                // console.log(user.friendList[idx - 1].id, data.senderId);
                if (user.friendList[idx - 1].id === data.senderId && data.state === "typing") {
                    setlastSeenState("typing")
                }

                if (user.friendList[idx - 1].lastSeen === "online") {
                    setlastSeenState("online")
                }
            }
        })

    }, [socket])


    return <></>
}



export const On_urlUpdate = () => {
    const Dispatch: any = useDispatch()

    const { user } = useSelector<rootState, userInterface>((state) => state.user);
    // send url to update message
    useEffect((): any => {

        socket.on('RE_UPDATED_URL', (data: any) => {
            Dispatch(updateUrl(data, user.id as string))
        })
        return () => socket.off('RE_UPDATED_URL');
    }, [socket])


    return <></>
}

