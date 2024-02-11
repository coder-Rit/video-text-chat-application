 import { io } from "socket.io-client";
 
 const socket =  io(process.env.REACT_APP_SERVER_API as string);

export default socket






