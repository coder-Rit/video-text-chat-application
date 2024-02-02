 import { io } from "socket.io-client";
import { SERVER_API } from "../config/config";

 const socket =  io(SERVER_API);

export default socket






