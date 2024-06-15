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
  enum DeliveryTYpe {
   seen
   unseen  
   delivered 
   out
  }

  type MessageT {
    uuid:String
    id: ID
    msg: String
    senderId: ID
    receiverId: ID 
    createdAt: String
    type: MessageType
    delivery:DeliveryTYpe
    fileData: FileT
  }

  type FriendChatT {
    friendId: String
    chats: [MessageT]
  }

   
      
`;