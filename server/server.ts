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
import socketController from "./socketController/sockets";
import intializeScoketIO from "./socketController";


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

  // const io = new Server(httpserver, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //     methods: ['GET', 'POST']
  //   },
  // });




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

    intializeScoketIO(httpserver, app)


    // socket.on('get_online_status', (data) => {

    //   if (onlineUser.includes(data.frdId)) {
    //     data.state = "online"
    //   }
    //   socket.join(data.myId)

    //   io.to(data.myId).emit('got_online_status', data)

    // })



  });
}

init();

