export const typeDefs = `#graphql

  scalar Upload
 
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

  type uploadFilesT{
    fileName: String
    url:String
  }
 


      
`;