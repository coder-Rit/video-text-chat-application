import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectToDatabase from "./config/dataBase";
import cors from "cors";

import dotenv from 'dotenv';
import createApolloGraphqlServer from "./graphql";
import { Socket, Server } from 'socket.io';
import { createServer } from "http";
import { ObjectId } from "mongoose";

dotenv.config({ path: "./config/config.env" });

interface messageI {
  msg: string,
  senderId: string,
  reciverId: string,
}

const getRoomNameBydata = (data: messageI):string => {

   if (data.senderId > data.reciverId) {
    return  data.senderId + data.reciverId
  } else {
    return  data.reciverId + data.senderId

  }

    
}

async function init() {
  const app: Express = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

  app.use(express.json());
  connectToDatabase();

  // Create GraphQL Server

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  const httpserver = createServer(app);

  const io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST']
    },
  });




  let roomname = ''
  let allUser = []

  httpserver.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);

    io.on('connection', (socket: Socket) => {
      console.log(`User connected ${socket.id}`);

      socket.on('startChat', (data: messageI) => {
        console.log("room created by ", data);
        const room  = getRoomNameBydata(data)
        console.log(room)
        
        socket.join(room)



        socket.to(room).emit('recive_msg', {
          msg: `${data.reciverId} has joined the chat`,
          senderId: data.senderId,
          reciverId:data.reciverId
        })

      })

      socket.on('send_msg', (data: messageI) => {
        const room =  getRoomNameBydata(data)
        console.log(room)
        
        io.in(room).emit('recive_msg', data)
        
      })
    });
  });
}

init();
