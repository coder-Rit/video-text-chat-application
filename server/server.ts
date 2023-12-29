
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectToDatabase from "./config/dataBase";
import cors from "cors"

import dotenv from 'dotenv';
import createApolloGraphqlServer from "./graphql";

dotenv.config({ path: "./config/config.env" });

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
  }))

  app.use(express.json());
  connectToDatabase(); 

  // Create Graphql Server 

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });
  

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();