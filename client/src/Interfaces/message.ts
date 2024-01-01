export interface messageI {
  msg: string,
  senderId: string,
  reciverId: string,
}


export interface friendChatI {
  friendId: string
  chats: messageI[],
}

export interface allFriendsChatI {
  AllfriendChats:friendChatI[]
}




export interface allfriendsTriI{
  [abc_id:string]:messageI[]
  
}
  

  export interface state_allFrineds{
    chatState:allfriendsTriI
  }