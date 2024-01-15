export const typeDefs = `#graphql

  
  type FileT {
    url:  String
    mimeType: String
    fileName: String
    fileSize: Int
  }

  enum MessageType {
    img
    text
    doc
  }

  type MessageT {
    id: ID
    msg: String
    senderId: ID
    receiverId: ID 
    createdAt: String
    type: MessageType
    fileData: FileT
  }

  type FriendChatT {
    friendId: String
    chats: [MessageT]
  }

   
      
`;