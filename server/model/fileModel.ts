
import mongoose, { Document, Schema } from 'mongoose';

export interface fileI {
    file: Buffer,

}

interface fileIDocument extends fileI, Document { }

const messageSchema = new Schema<fileIDocument>({

    file: {
        type: Buffer
    }



});


const messageModel = mongoose.model<fileIDocument>('message', messageSchema);

export { messageModel, fileIDocument };

