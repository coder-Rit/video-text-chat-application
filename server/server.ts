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
import { messageI, messageModel } from "./model/messageModel";
import { UserModel } from "./model/userModel";
import { log } from "console";

dotenv.config({ path: "./config/config.env" });



interface onlineStatusChecker_I {
  myId: string,
  friendsIds: string[]
} 
interface typingInter {
  senderId: string,
  receiverId: string,
  state: string
}


const getRoomNameBydata = (data: messageI | typingInter): string => {

  if (data.senderId > data.receiverId) {
    return data.senderId + data.receiverId
  } else {
    return data.receiverId + data.senderId

  }


}

async function init() {
  const app: Express = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000/graphql"
  }));

  app.use(express.json());
  connectToDatabase();

  // Create GraphQL Server

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });
 

  
  const httpserver = createServer(app);
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(httpserver)) );

  const io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST']
    },
  });





  let onlineUser: string[] = []
  let userBysocketId: any = {

  }

  // function findCommonArray(arr1: string[], arr2: string[]) {
  //   const set2 = new Set(arr2);
  //   return arr1.filter(value => set2.has(value));
  // }

  httpserver.listen(PORT, async () => {
    console.log(`Server started at PORT:${PORT}`);

    io.on('connection', (socket: Socket) => {
      console.log(`User connected ${socket.id}`);



      socket.on('set_online_status', (data: onlineStatusChecker_I) => {

        if (!onlineUser.includes(data.myId)) {
          onlineUser.push(data.myId)
          userBysocketId[socket.id as string] = data.myId;
        }
        io.emit('see_online_status', onlineUser);
        console.log("see_online_status", onlineUser);

      })

      socket.on('startChat', (data: messageI) => {
        console.log("room created by ", data);
        const room = getRoomNameBydata(data)
        console.log(room)

        socket.join(room)

      })

      socket.on('get_online_status', (data) => {

        if (onlineUser.includes(data.frdId)) {
          data.state = "online"
        }
        socket.join(data.myId)

        io.to(data.myId).emit('got_online_status', data)

      })


      socket.on('is_typing_started', (data: typingInter) => {

        const room = getRoomNameBydata(data)
        if (data.state !== "typing" && onlineUser.includes(data.receiverId)) {
          data.state = "online"
        }
        io.in(room).emit('is_typing_started', data)

      })

      socket.on('send_msg', async (data: messageI) => {

        const room = getRoomNameBydata(data)
        io.in(room).emit('recive_msg', data)


        try {
          const message = await messageModel.create(data)
          await message.save()
          console.log(data);

          io.in(room).emit('recive_msg', message)

        } catch (error: any) {
          new Error(`unable to send data to db ${error}`)
        }

      })

      socket.on('disconnect', async () => {
        console.log(socket.id, " is disconnected");
        const disconnectedUser = userBysocketId[socket.id]

        onlineUser = onlineUser.filter(data => {
          return data !== disconnectedUser
        })

        delete userBysocketId[socket.id]


        io.emit('see_online_status', onlineUser)
        console.log("see_online_status");




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



      })






    });


  });
}

init();
