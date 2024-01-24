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
    state: string
}