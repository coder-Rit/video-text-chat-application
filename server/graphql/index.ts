import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Chats } from "./chats";
import jwt from 'jsonwebtoken';
import { Request } from "express";

async function createApolloGraphqlServer() {

  interface MyContext {
    userId: string;
  }

  const gqlServer = new ApolloServer({
    typeDefs:  `
      ${User.typeDefs}
      ${Chats.typeDefs}
      type Query {
        ${User.queries}
        ${Chats.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Chats.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Chats.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Chats.resolvers.mutations,
      },
    },
    
  } );

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
