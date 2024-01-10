
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface fileIdI {
  url: string,
  mimeType: string,
  fileName: string
  fileSize: number
}
interface messageI {
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  type: "doc" | "img" | "text",
  fileData?: fileIdI[]
}
interface MessageDocument extends messageI, Document { }

const messageSchema = new Schema<MessageDocument>({
  createdAt: {
    type: Date,
  },
  msg: {
    type: String
  },
  senderId: mongoose.Schema.ObjectId,
  receiverId: mongoose.Schema.ObjectId,
  type: {
    type: String
  },
  fileData: [{
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
  }]

});


const messageModel = mongoose.model<MessageDocument>('message', messageSchema);

export { messageI, messageModel, MessageDocument };

