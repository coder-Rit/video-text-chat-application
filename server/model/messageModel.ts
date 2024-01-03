
 import mongoose, { Document, Schema, Types } from 'mongoose';

export interface fileI {
  file: Buffer,
  mimeType: string,
  fileName: string
  fileSize: number
}
interface messageI {
  msg: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  type: "file" | "text",
  fileData?: fileI[]
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
    file: {
      type: Buffer
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

