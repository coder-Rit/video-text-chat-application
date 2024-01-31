import { useDispatch } from "react-redux";
import socket from "."
import { messageI } from "../Interfaces/message";
import { appendMsg, updateUrl } from "../actions/chatAction";
import { useEffect, useState } from "react";
import { typingInter } from "../Interfaces/common";
import { useSelector } from "react-redux";
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";



export const On_exchangeMessage = () => {
    const Dispatch: any = useDispatch()

    useEffect((): any => {
        socket.on('recive_msg', (data: messageI[]) => {
            Dispatch(appendMsg(data[0].senderId as string, data));
        })
        return () => socket.off('recive_msg');
    }, [socket])


    return <></>
}



export const On_headerStatus = ({ setlastSeenState }: { setlastSeenState: (str: string) => void }) => {
    const { user } = useSelector<rootState, userInterface>((state) => state.user);


    useEffect(() => {
        socket.on('is_typing_started', (data: typingInter) => {
            if (user.id !== data.senderId) {
                console.log(data.state);
                if (data.state === "typing") {
                    setlastSeenState("typing")
                } else if (data.state === "946681200000") {
                    setlastSeenState("online")
                } else {
                    setlastSeenState(data.state)
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

