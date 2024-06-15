
export interface fileI {
  url: string,
  mimeType: string,
  fileName: string,
  fileSize: number
}

export interface messageI {
  uuid:string
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt: string,
  type: "doc" | "img" | "text",
  delivery: "seen" | "unseen" | "processing" | "out" 
  fileData?: fileI

}

export interface SET_DELIVERY_STATUS_I {
  uuidList: string[]
  senderId: string,
  receiverId: string,
  next_status: string
}


export interface friendChatI {
  [key: string]: messageI[]
}


export interface fileUrl {
  url: string, uuid: string,
}


export interface FilesQI {
  bufferFile?:File,
  msg:messageI
}

 
export interface urlUpdateObjectI {
  uuid:string
  url: string,
  senderId: string,
  receiverId: string,
}

export interface TypeingStatus{
  senderId: string,
  receiverId: string,
  state: boolean,
}

export interface onlineStatus {
  myId: string,
  friendId: string,
  state: string
}



