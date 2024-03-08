import { createServer } from "http";

import express, { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from 'dotenv';
import schedule from "node-schedule";


import createApolloGraphqlServer, { MyContext } from "./graphql";
import intializeScoketIO from "./socketController";
import connectToDatabase from "./config/dataBase";
import userRouter from "./router/userRouter"
import pageCountRouter from "./router/pageCountRouter"
import cluster from 'cluster';
import os from 'os';
import axios from "axios";

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
    //intialize Scoket.io
    intializeScoketIO(httpserver, app)
  });


  schedule.scheduleJob('*/59 * * * * *', async function () {

    axios.get(`https://api.multiavatar.com/Binx%20Bond.svg`).then(data => console.log("🍏🍏 server refresh 🍏🍏")
    )

  });
}


init()
