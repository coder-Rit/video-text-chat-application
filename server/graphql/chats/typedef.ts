export const typeDefs = `#graphql

  scalar Upload
 
  type FileT {
    url:  String
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