export const typeDefs = `#graphql
    type User {
        id: ID!
        userName:String
        firstName: String
        lastName: String!
        email: String
        password:String
        profileImageURL: String!
        token:String
        friendList:[User]
        idList:[ID]
    }

    type MessageT{
        id:ID
        msg:String
        senderId:ID
        receiverId:ID
        createdAt:String
    }
    
    type friendChatT {
         friendId: String
         chats: [MessageT]
    }

     

 
`;