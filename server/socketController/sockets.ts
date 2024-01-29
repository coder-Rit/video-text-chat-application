import { Server, Socket } from "socket.io";
import { messageI, messageModel } from "../model/messageModel";
import { UserModel } from "../model/userModel";
import { friendChatI, onlineStatusChecker_I, typingInter } from "../utils/helpers";
import { getRoomNameBydata, saveMessage } from "../utils/interfaces";





let onlineUser: string[] = []
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

    function initializeChat(data: messageI) {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        socket.join(room)

    }

    function chatSetup(data: onlineStatusChecker_I) {
        if (!onlineUser.includes(data.myId)) {
            onlineUser.push(data.myId)
            userBysocketId[socket.id as string] = data.myId;
        }
    }

    function exchangeMessage(data: messageI[]) {
        const room = getRoomNameBydata(data[0].senderId, data[0].receiverId)

        io.in(room).emit('recive_msg', data)
        if (data[0].type === "text") {
            saveMessage(data[0])
        } else {
            data.forEach(msg => {
                UrlLessMsg[msg.uuid] = msg
            })

        }
    }

    function userStatus(data: typingInter) {
        const room = getRoomNameBydata(data.senderId, data.receiverId)

        if (data.state === "typing") {
            io.in(room).emit('is_typing_started', data)
        } else if (onlineUser.includes(data.receiverId)) {

            data.state = "online"
        } else {
            io.in(room).emit('is_typing_started', data)
        }
    }

    function updateURL(data: any) {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        io.in(room).emit('RE_UPDATED_URL', data);

        let updateMsg = UrlLessMsg[data.uuid];

        if (updateMsg && updateMsg.fileData) {
            updateMsg.fileData.url = data.url;
        }

        saveMessage(updateMsg)
        delete UrlLessMsg[data.uuid]
    }

    async function disconnect() {
        console.log(socket.id, " is disconnected");
        const disconnectedUser = userBysocketId[socket.id]

        onlineUser = onlineUser.filter(data => {
            return data !== disconnectedUser
        })

        delete userBysocketId[socket.id]


        io.emit('see_online_status', onlineUser)

        //updateLastSeen
        try {

            const newUpdate = await UserModel.findByIdAndUpdate(disconnectedUser, {
                lastSeen: new Date().toISOString()
            })

        } catch (error: any) {
            new Error(error)
        }
    }

    return {
        initializeChat,
        chatSetup,
        exchangeMessage,
        userStatus,
        updateURL,
        disconnect
    }


}

export default socketController