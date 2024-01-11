export const typeDefs = `#graphql

 
    type User {
    id: ID!
    userName: String
    firstName: String
    lastName: String!
    email: String
    password: String
    profileImageURL: String!
    token: String
    friendList: [User]
    idList: [ID]
    lastSeen:String
  }
 
      
`;