import { Types } from "mongoose";
import { User, UserModel } from "../../model/userModel";
import { messageModel } from "../../model/messageModel";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
 


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
  

};


export const resolvers = { queries, mutations }; 