import socket from "."
import { headerStatusI, messageI, urlUpdateObjectI } from "../Interfaces/message"

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
export function emit_InitChat(message:temp_message) {
    socket.emit('startChat', message)
}
export function emit_urlUpdator(msgUpdator:urlUpdateObjectI) {
    socket.emit('UPDATE_URL', msgUpdator)
}
export function emit_headerStatus(headerStatus:headerStatusI) {
    socket.emit('is_typing_started', headerStatus)
}

export function closeSocket() {
    socket.close()
}


