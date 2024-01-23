import { Server, Socket } from "socket.io";
import { messageI, messageModel } from "../model/messageModel";
import { UserModel } from "../model/userModel";

const getRoomNameBydata = (senderId: string, receiverId: string): string => {

    if (senderId > receiverId) {
        return senderId + receiverId
    } else {
        return receiverId + senderId

    }
}

const saveMessage = async (updateMsg: messageI) => {
    try {
        const message = await messageModel.create(updateMsg)
        console.log(message);

        await message.save()
    } catch (error: any) {
        new Error(`unable to send data to db ${error}`)
    }
}


export interface friendChatI {
    [key: string]: messageI
}
interface onlineStatusChecker_I {
    myId: string,
    friendsIds: string[]
}
interface typingInter {
    senderId: string,
    receiverId: string,
    state: string
  }

let onlineUser: string[] = []
let userBysocketId: any = {

}
let UrlLessMsg: friendChatI = {

}

export interface socketControllerI {
    initializeChat:(data: messageI)=>void,
    chatSetup:(data: messageI)=>void,
    exchangeMessage:(data: messageI)=>void;
}


function socketController( socket: Socket,io:any) { 

    function initializeChat(data: messageI) {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        socket.join(room)

    }

    function chatSetup(data: onlineStatusChecker_I) {
        if (!onlineUser.includes(data.myId)) {
            onlineUser.push(data.myId)
            userBysocketId[socket.id as string] = data.myId;
        }
        console.log(onlineUser);
    }

    function exchangeMessage(data: messageI[]) {
        const room = getRoomNameBydata(data[0].senderId, data[0].receiverId)

        io.in(room).emit('recive_msg', data)
        if (data[0].type === "text") {
            console.log("recevice msg", data);
            saveMessage(data[0])
        } else {
            data.forEach(msg => {
                UrlLessMsg[msg.uuid] = msg
            })

        }
    }
    
    function userStatus(data:typingInter) {
        const room = getRoomNameBydata(data.senderId, data.receiverId)

        if (data.state === "typing") {
          io.in(room).emit('is_typing_started', data)
        } else if (onlineUser.includes(data.receiverId)) {

          console.log(onlineUser);
          data.state = "online"
        } else {
          console.log("else");
          io.in(room).emit('is_typing_started', data)
        }
    }

    function updateURL(data:any) {
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

          console.log(disconnectedUser);

          const newUpdate = await UserModel.findByIdAndUpdate(disconnectedUser, {
            lastSeen: new Date().toISOString()
          })
          console.log(newUpdate);

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