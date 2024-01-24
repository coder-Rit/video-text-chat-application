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

export const MyContext =  ({ req }: { req: Request }) => {
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
  }


export default createApolloGraphqlServer;
