import { Server, Socket } from "socket.io";
import { createServer } from "http";
import socketController from "./sockets";



function intializeScoketIO(httpserver: any, app: any) {



    const io = new Server(httpserver, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', 'POST']
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`User connected ${socket.id}`);
        const CS = socketController(socket, io)

        socket.on('set_online_status', (data) => CS.chatSetup(data))
        socket.on('startChat', (data) => CS.initializeChat(data))
        socket.on('send_msg', (data) => CS.exchangeMessage(data))
        socket.on('is_typing_started', (data) => CS.userStatus(data))
        socket.on('UPDATE_URL', (data) => CS.updateURL(data))
        socket.on('disconnect', async () => CS.disconnect())





    });


}

export default intializeScoketIO