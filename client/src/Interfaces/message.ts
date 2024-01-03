export interface messageI {
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt:string,

}


export interface friendChatI {
  friendId: string
  chats: messageI[],
}

export interface allFriendsChatI {
  AllfriendChats:friendChatI[]
}


 