import { messageI } from "../model/messageModel"

export interface friendChatI {
    [key: string]: messageI
}
export interface onlineStatusChecker_I {
    myId: string,
    friendsIds: string[]
}
export interface typingInter {
    senderId: string,
    receiverId: string,
    state: boolean
}
export interface onlineStatus {
    myId: string,
    friendId: string,
    state: string
}
export interface SET_DELIVERY_STATUS_I {
    uuidList: string[]
    , senderId: string,
    receiverId: string
    , next_status: string
}
