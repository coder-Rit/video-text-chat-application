
export interface fileI {
  file: File,
  mimeType: string,
  fileName: string,
  fileSize: number
}

export interface messageI {
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt: string,
  type: "file" | "text",
  fileData?: fileI[]


}


export interface friendChatI {
  friendId: string 
  chats: messageI[],
}

export interface allFriendsChatI {
  AllfriendChats: friendChatI[]
}


