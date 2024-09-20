import { createServer } from "http";
import { availableParallelism } from 'node:os';
import process from 'node:process';

import express, { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from 'dotenv';

import createApolloGraphqlServer, { MyContext } from "./graphql";
import intializeScoketIO from "./services/Socket.io";
import connectToDatabase from "./config/dataBase";
import userRouter from "./router/userRouter"
import pageCountRouter from "./router/pageCountRouter"
import cluster from 'cluster';
import Socketio from "./services/Socket.io";

dotenv.config({ path: "./config/config.env" });





async function init() {

  const app: Express = express();
  const PORT = Number(process.env.PORT) || 4000;



  //cors halder
  app.use(cors({
    credentials: true,
    origin: [process.env.ORIGIN_1 as string,process.env.ORIGIN_2 as string] 
  }))
  app.use(express.json());


  //connect to database
  connectToDatabase();
    
  app.get("/", (req, res) => {
    res.send("working fine")
  })

  app.use("/api/v1", userRouter)
  app.use("/api/v1", pageCountRouter)



  // Create GraphQL Server  
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), {
    context: MyContext
  } as any));


  // http server for socketio
  const httpserver = createServer(app);
  httpserver.listen(PORT, async () => {
    console.log(` 🔌🔌 Server started at PORT:${PORT} 🔌🔌 `);
  });
  //intialize Scoket.io
  const socketWithPubSub = new Socketio(httpserver);

  socketWithPubSub.listeners();
  
}



const numCPUs = availableParallelism();
// const numCPUs = 1;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  init()

  console.log(`Worker ${process.pid} started`);
}
