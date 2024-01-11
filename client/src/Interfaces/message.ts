
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
  fileData?: fileI

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

