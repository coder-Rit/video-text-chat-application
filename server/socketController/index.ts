import { Server, Socket } from "socket.io";
import socketController from "./sockets";



function intializeScoketIO(httpserver: any, app: any) {



    const io = new Server(httpserver, {
        cors: {
            origin: [process.env.ORIGIN_1 as string,process.env.ORIGIN_2 as string] ,
            methods: ['GET', 'POST']
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`User connected ${socket.id}`);
        const CS = socketController(socket, io)
        socket.on('USER_CONNECTED', (data) => CS.userConnected(data.id))
        socket.on('startChat', (data) => CS.initializeChat(data))
        socket.on('send_msg', (data) => CS.exchangeMessage(data))
        socket.on('IS_TYPING', (data) => CS.isTyping(data))
        socket.on('GET_ONLINE_STATUS', (data) => CS.isOnline(data))
        socket.on('UPDATE_URL', (data) => CS.updateURL(data))
        socket.on('SEND_MSG_ACKNOWLEGMENT', (data) => CS.deliveryStatus(data))
        socket.on('disconnect', async () => CS.disconnect())

    });


}

export default intializeScoketIO