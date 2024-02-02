import { createServer } from "http";

import express, { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from 'dotenv';

import createApolloGraphqlServer, { MyContext } from "./graphql";
import intializeScoketIO from "./socketController";
import connectToDatabase from "./config/dataBase";


dotenv.config({ path: "./config/config.env" });
 
 

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
    console.log(`Server started at PORT:${PORT}`);
    //intialize Scoket.io
    intializeScoketIO(httpserver, app)
  });
}

init();


 