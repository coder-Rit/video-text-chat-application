 
import mongoose, { Document, Schema, Types } from 'mongoose';

 interface messageI {
   msg: string,
   senderId: string,
   receiverId: string,
   createdAt:Date,
}
interface MessageDocument extends messageI, Document { }

const messageSchema = new Schema<MessageDocument>({
  createdAt:{
    type:Date,
  },
  msg: {
    type:String
  },
  senderId: mongoose.Schema.ObjectId,
  receiverId: mongoose.Schema.ObjectId,
});

 
const messageModel = mongoose.model<MessageDocument>('message', messageSchema);

export { messageI, messageModel, MessageDocument};

