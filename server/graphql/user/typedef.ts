export const typeDefs = `#graphql

    scalar Upload

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

  type FileT {
    file: Upload
    mimeType: String
    fileName: String
    fileSize: Int
  }

  enum MessageType {
    file
    text
  }

  type MessageT {
    id: ID
    msg: String
    senderId: ID
    receiverId: ID
    createdAt: String
    type: MessageType
    fileData: [FileT]
  }

  type FriendChatT {
    friendId: String
    chats: [MessageT]
  }
      
`;