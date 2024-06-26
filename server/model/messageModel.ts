
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface fileIdI {
  url: string,
  mimeType: string,
  fileName: string
  fileSize: number
}
interface messageI {
  uuid:string,
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  type: "doc" | "img" | "text",
  delivery: "seen" | "unseen" | "delivered" | "out" 
  fileData?: fileIdI
}
interface MessageDocument extends messageI, Document { }

const messageSchema = new Schema<MessageDocument>({
  uuid:{
    type: String
  },
  createdAt: {
    type: Date,
    required:true
  },
  msg: {
    type: String
  },
  senderId: mongoose.Schema.ObjectId,
  receiverId: mongoose.Schema.ObjectId,
  delivery:{
    type:String,
    default:"out"
  },
  type: {
    type: String,
    required:true
  },
  fileData: {
    url: {
      type: String 
    },
    mimeType: {
      type: String 
    },
    fileName: {
      type: String 
    },
    fileSize: {
      type: Number 
    }
  }

});


const messageModel = mongoose.model<MessageDocument>('message', messageSchema);

export { messageI, messageModel, MessageDocument };

