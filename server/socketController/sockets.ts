import { Server, Socket } from "socket.io";
import { messageI, messageModel } from "../model/messageModel";
import { UserModel } from "../model/userModel";
import { friendChatI, onlineStatusChecker_I, typingInter } from "../utils/helpers";
import { getRoomNameBydata, saveMessage, userUpdate } from "../utils/functions";





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


    async function userConnected(id: string) {
        socket.join(id)
        if (!onlineUser.includes(id)) {
            onlineUser.push(id)
            userBysocketId[socket.id as string] = id;
        }
        io.emit("ONLINE_USER_LIST", onlineUser)
        
        console.log("socket joined by ", id)
        await userUpdate(id, { lastSeen: new Date().toISOString() })

    }


    function initializeChat(data: messageI) {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        socket.join(room)
    }



    function exchangeMessage(data: messageI[]) {

        io.in(data[0].receiverId).emit('recive_msg', data)
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
        } else {
            io.in(room).emit('is_typing_started', data)
        }
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

    async function disconnect() {
        console.log(socket.id, " is disconnected");
        const disconnectedUser = userBysocketId[socket.id]

        onlineUser = onlineUser.filter(data => {
            return data !== disconnectedUser
        })

        delete userBysocketId[socket.id]
        io.emit("ONLINE_USER_LIST", onlineUser)


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
        userStatus,
        updateURL,
        disconnect
    }


}

export default socketController