import { createServer } from "http";

import express, { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from 'dotenv';
import schedule from "node-schedule";


import createApolloGraphqlServer, { MyContext } from "./graphql";
import intializeScoketIO from "./socketController";
import connectToDatabase from "./config/dataBase";
import cluster from'cluster';
import os from'os';

dotenv.config({ path: "./config/config.env" });

schedule.scheduleJob(' */13 * * * *', function async(){
      console.log("🍏🍏 server refresh 🍏🍏");
      
});
 
 

async function init() {

  const app: Express = express();
  const PORT = Number(process.env.PORT) || 4000;


  //cors halder
  app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
  }))
  app.use(express.json());
 

  //connect to database
  connectToDatabase();

  app.get("/",(req,res)=>{
    res.send("working fine")
  })


  // Create GraphQL Server  
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), {
    context:  MyContext
  } as any));
 

  // http server for socketio
  const httpserver = createServer(app);  
  httpserver.listen(PORT, async () => {
    console.log(` 🔌🔌 Server started at PORT:${PORT} 🔌🔌 `);
    //intialize Scoket.io
    intializeScoketIO(httpserver, app)
  });
}



if (cluster.isPrimary) {
  // Fork workers
  console.log(`We have ${os.cpus().length} 🤖 available`);
  
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  
  console.log(`Worker 🧑‍🏭 ${process.pid} started`);
  init();

}