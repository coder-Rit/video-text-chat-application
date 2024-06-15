import { Server, Socket } from "socket.io";
import { messageI, messageModel } from "../model/messageModel";
import { UserModel } from "../model/userModel";
import { SET_DELIVERY_STATUS_I, friendChatI, onlineStatus, onlineStatusChecker_I, typingInter } from "../utils/helpers";
import { getRoomNameBydata, saveMessage, updateMessageStatus, userUpdate } from "../utils/functions";




const onlineUser = new Set();

// let onlineUser: string = new Set();
let userBysocketId: any = {

}
let UrlLessMsg: friendChatI = {

}

export interface socketControllerI {
    initializeChat: (data: messageI) => void,
    chatSetup: (data: messageI) => void,
    exchangeMessage: (data: messageI) => void;
}


function socketController(socket: Socket, io: any) {


    async function userConnected(id: string) {
        socket.join(id)
        onlineUser.add(id);
        userBysocketId[socket.id as string] = id;
         console.log("socket joined by ", id)
    }


    function initializeChat(data: messageI) {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        socket.join(room)
        io.in(room).emit('CHAT_INITIATED', data)
    }



    function exchangeMessage(data: messageI[]) {
        io.in(data[0].receiverId).emit('recive_msg', data)

        let Ack_data = data.map((m) => m.uuid)
        io.in(data[0].senderId).emit('DELIVERY_OUT', { uuidList: Ack_data, receiverId: data[0].receiverId, senderId: data[0].senderId, next_status: "out" })
        if (data[0].type === "text") {
            saveMessage(data[0])
        } else {
            data.forEach(msg => {
                UrlLessMsg[msg.uuid] = msg
            })

        }
    }


    function isTyping(data: typingInter) {

        if (data.state) {
            io.in(data.receiverId).emit('IS_TYPING', true)
        } else {
            io.in(data.receiverId).emit('IS_TYPING', false)
        }
    }


    function isOnline(data: onlineStatus) {
        io.in(data.myId).emit('GET_ONLINE_STATUS', onlineUser.has(data.friendId))
        
    }

    function heIsOffline(data: string) {
        io.emit('HE_IS_OFFLINE', data)
        
    }


    function updateURL(data: any) {

        io.in(data.receiverId).emit('RE_UPDATED_URL', data);

        let updateMsg = UrlLessMsg[data.uuid];

        if (updateMsg && updateMsg.fileData) {
            updateMsg.fileData.url = data.url;
        }
        console.log(updateMsg);

        saveMessage(updateMsg)
        delete UrlLessMsg[data.uuid]
    }


    function deliveryStatus(data: SET_DELIVERY_STATUS_I) {

        updateMessageStatus(data.uuidList,data.next_status);
        io.in(data.senderId).emit('DELIVERY_OUT', data)

    }

    async function disconnect() {
        console.log(socket.id, " is disconnected");
        const disconnectedUser = userBysocketId[socket.id]

        onlineUser.delete(disconnectedUser);

        delete userBysocketId[socket.id]
        heIsOffline(disconnectedUser);
 

        //updateLastSeen
        try {
            const ab = await userUpdate(disconnectedUser, { lastSeen: new Date().toISOString() })
            console.log(ab);

        } catch (error: any) {
            new Error(error)
        }
    }

    return {
        initializeChat,
        userConnected,
        exchangeMessage,
        isTyping,
        updateURL,
        deliveryStatus,
        isOnline,
        disconnect
    }


}

export default socketController