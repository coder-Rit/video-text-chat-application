import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Chats } from "./chats";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


async function createApolloGraphqlServer(httpServer:any) {

  const gqlServer = new ApolloServer({
    typeDefs: `
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
    plugins:[ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  // Start the gql server
   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;