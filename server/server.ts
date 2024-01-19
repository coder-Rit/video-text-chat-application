import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectToDatabase from "./config/dataBase";
import cors from "cors";

import dotenv from 'dotenv';
import createApolloGraphqlServer from "./graphql";
import { Socket, Server } from 'socket.io';
import { createServer } from "http";
import { messageI, messageModel } from "./model/messageModel";
import { UserModel } from "./model/userModel";
import jwt from "jsonwebtoken";


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


export interface friendChatI {
  [key: string]: messageI
}



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

async function init() {
  const app: Express = express();
  const PORT = Number(process.env.PORT) || 8000;


  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }))

  app.use(express.json());
  connectToDatabase();

  // Create GraphQL Server

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });



  const httpserver = createServer(app);

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), {
    context: ({ req }: { req: Request }) => {
      const { authorization }: any = req.headers;

      if (authorization) {
        try {
          console.log(process.env.JWT_SECREATE as string);

          const data: any = jwt.verify(authorization, process.env.JWT_SECREATE as string);

          return { id: data.id };
        } catch (error) {
          // Handle token verification error
          throw new Error('Invalid token');
        }
      }
      return {};
    },
  } as any));

  const io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST']
    },
  });





  let onlineUser: string[] = []
  let userBysocketId: any = {

  }
  let UrlLessMsg: friendChatI = {

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
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        socket.join(room)

        if (io.sockets.adapter.rooms.has(room)) {
          console.log(`Room ${room} exist.`);

        } else {
          console.log(`Room ${room} does not exist.`);
        }

      })


      socket.on('is_typing_started', (data: typingInter) => {

        const room = getRoomNameBydata(data.senderId, data.receiverId)
        if (data.state !== "typing" && onlineUser.includes(data.receiverId)) {
          data.state = "online"
        }
        io.in(room).emit('is_typing_started', data)

      })

      socket.on('send_msg', (data: messageI[]) => {

        console.log(data);


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

      })

      socket.on('UPDATE_URL', (data) => {
        let room = getRoomNameBydata(data.senderId, data.receiverId)
        io.in(room).emit('RE_UPDATED_URL', data);

        let updateMsg = UrlLessMsg[data.uuid];

        if (updateMsg && updateMsg.fileData) {
          updateMsg.fileData.url = data.url;
        }

        saveMessage(updateMsg)
        delete UrlLessMsg[data.uuid]


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
