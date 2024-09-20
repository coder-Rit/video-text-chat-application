import { Server, Socket } from "socket.io";
import { Pub, Sub } from "../Redis";
import { friendChatI, onlineStatus, SET_DELIVERY_STATUS_I, typingInter } from "../../utils/helpers";
import { getRoomNameBydata, userUpdate } from "../../utils/functions";
import { messageI } from "../../model/messageModel";


class Socketio {
    private _io: Server;
    private onlineUser: Set<string>;
    private userBysocketId: { [key: string]: string };
    private UrlLessMsg: { [key: string]: messageI };

    constructor(httpserver: any) {
        this._io = new Server(httpserver, {
            cors: {
                origin: [process.env.ORIGIN_1 as string, process.env.ORIGIN_2 as string],
                methods: ['GET', 'POST'],
            },
        });

        this.userBysocketId = {};
        this.UrlLessMsg = {};
        this.onlineUser = new Set();

        Sub.subscribe("MESSAGE");
        Sub.subscribe("DELIVERY_STATUS");
    }



    public listeners = () => {
        const io = this._io;



        const sendMessage = (channel: string, data: string) => {
            if (channel === "MESSAGE") {
                const res = JSON.parse(data);
                io.in(res[0].receiverId).emit('recive_msg', res);
            }
        };

        const get_deliveryStatus = (channel: string, data: string) => {
            if (channel === "DELIVERY_STATUS") {
                const res = JSON.parse(data);
                
                io.in(res.senderId).emit('DELIVERY_OUT', res);
            }
        };

        io.on('connection', (socket: Socket) => {
            const userConnected = async (id: string) => {
                socket.join(id);
                this.onlineUser.add(id); // No error here with arrow function
                this.userBysocketId[socket.id] = id;
                console.log("socket joined by ", id);
            };

            const initializeChat = (data: messageI) => {
                const room = getRoomNameBydata(data.senderId, data.receiverId);
                socket.join(room);
                io.in(room).emit('CHAT_INITIATED', data);
            };

            const exchangeMessage = async (data: messageI[]) => {
                await Pub.publish('MESSAGE', JSON.stringify(data));

                const Ack_data = data.map((m) => m.uuid);
                io.in(data[0].senderId).emit('DELIVERY_OUT', {
                    uuidList: Ack_data,
                    receiverId: data[0].receiverId,
                    senderId: data[0].senderId,
                    next_status: "out",
                });

                if (data[0].type !== "text") {
                    data.forEach((msg) => {
                        this.UrlLessMsg[msg.uuid] = msg;
                    });
                }
            };

            const isTyping = (data: typingInter) => {
                io.in(data.receiverId).emit('IS_TYPING', data.state);
            };

            const isOnline = (data: onlineStatus) => {
                io.in(data.myId).emit('GET_ONLINE_STATUS', this.onlineUser.has(data.friendId));
            };

            const heIsOffline = (data: string) => {
                io.emit('HE_IS_OFFLINE', data);
            };

            const updateURL = (data: any) => {
                io.in(data.receiverId).emit('RE_UPDATED_URL', data);

                const updateMsg = this.UrlLessMsg[data.uuid];
                if (updateMsg?.fileData) {
                    updateMsg.fileData.url = data.url;
                }

                delete this.UrlLessMsg[data.uuid];
            };

            const set_deliveryStatus = async (data: SET_DELIVERY_STATUS_I) => {
                console.log("DELIVERY_STATUS");

                await Pub.publish('DELIVERY_STATUS', JSON.stringify(data));
            };

            const disconnect = async () => {
                const disconnectedUser = this.userBysocketId[socket.id];
                this.onlineUser.delete(disconnectedUser);
                delete this.userBysocketId[socket.id];
                heIsOffline(disconnectedUser);

                try {
                    await userUpdate(disconnectedUser, { lastSeen: new Date().toISOString() });
                } catch (error: any) {
                    new Error(error);
                }
            };

            socket.on('USER_CONNECTED', (data) => userConnected(data.id));
            socket.on('startChat', (data) => initializeChat(data));
            socket.on('send_msg', (data) => exchangeMessage(data));
            socket.on('IS_TYPING', (data) => isTyping(data));
            socket.on('GET_ONLINE_STATUS', (data) => isOnline(data));
            socket.on('UPDATE_URL', (data) => updateURL(data));
            socket.on('SEND_MSG_ACKNOWLEGMENT', (data) => set_deliveryStatus(data));
            socket.on('disconnect', async () => disconnect());
        });

        Sub.on('message', (channel, data) => sendMessage(channel, data));
        Sub.on('message', (channel, data) => get_deliveryStatus(channel, data));
    };

    get io() {
        return this._io;
    }
}

export default Socketio;
