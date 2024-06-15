import socket from "."
import { SET_DELIVERY_STATUS_I, TypeingStatus, messageI, onlineStatus, urlUpdateObjectI } from "../Interfaces/message"

interface temp_message {
    msg: string,
    senderId: string,
    receiverId: string,
    createdAt: string,
}
   

export function emit_userConnected(id: string) {
    socket.emit('USER_CONNECTED', {
        id: id
    })
}
export function emit_exchangeMessage(messageArray:messageI[]) {
    socket.emit('send_msg', messageArray)
}
export function emit_messageAcknowlegment(deliveryData:SET_DELIVERY_STATUS_I) {
    socket.emit('SEND_MSG_ACKNOWLEGMENT', deliveryData)
}
export function emit_InitChat(message:temp_message) {
    socket.emit('startChat', message)
}
export function emit_urlUpdator(msgUpdator:urlUpdateObjectI) {
    socket.emit('UPDATE_URL', msgUpdator)
}
export function emit_is_Typing(headerStatus:TypeingStatus) {
    socket.emit('IS_TYPING', headerStatus);
}
export function emit_is_Online(headerStatus:onlineStatus) {
    socket.emit('GET_ONLINE_STATUS', headerStatus)
}

export function closeSocket() {
    socket.close()
}

 