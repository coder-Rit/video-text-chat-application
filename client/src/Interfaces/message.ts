
export interface fileI {
  url: string,
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
  [key: string]:  messageI[] 
 }
 