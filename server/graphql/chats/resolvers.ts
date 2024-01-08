import { Types } from "mongoose";
import { User, UserModel } from "../../model/userModel";
import { messageModel } from "../../model/messageModel";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { FileUpload } from "graphql-upload-ts";



const queries = {

  getChats: async (_: any, payload: { friendId: string }) => {


    const id = payload.friendId;

    const messages = await messageModel.find({
      $or: [
        { senderId: id },
        { receiverId: id },
      ],
    }).sort({ createdAt: 1 }).limit(100);

    const tempObj = {
      friendId: id,
      chats: messages
    }



    return tempObj



  }


};

const mutations = {
  uploadFiles: async (_: any, payload: { fileArray: FileUpload }) => {

    console.log("payload",payload);

    let res = []


    const { createReadStream, filename, mimetype, encoding } = await payload.fileArray

    const Stream = createReadStream()
    const pathName = path.join(__dirname, `../../public/${filename}`)
    await Stream.pipe(fs.createWriteStream(pathName))

    res.push({
      filename: filename,
      url: `http://localhost:4000/public/${filename}`,

    })

    return {res}



  }


};


export const resolvers = { queries, mutations }; 