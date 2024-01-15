import { Types } from "mongoose";
import { User, UserModel } from "../../model/userModel";
import { messageModel } from "../../model/messageModel";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
 


const queries = {

  getChats: async (_: any, payload: { friendId: string }) => {
    const id = payload.friendId;

    let messages = await messageModel.find({
      $or: [
        { senderId: id },
        { receiverId: id },
      ],
    }).sort({ createdAt: -1 }).limit(15)

    messages.reverse()
     const tempObj = {
      friendId: id,
      chats: messages
    } 
 
    return tempObj 

  },
  loadInitialChats: async (_: any, payload: { friendIds: string[]}) => {
    const ids = payload.friendIds;

    let allChats =[]

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      let messages = await messageModel.find({
        $or: [
          { senderId: id },
          { receiverId: id },
        ],
      }).sort({ createdAt: -1 }).limit(2)
      messages.reverse()
      const tempObj = {
       friendId: id,
       chats: messages
     } 
     allChats.push(tempObj) 
    }

 
    return allChats 

  }


};

const mutations = {
  

};


export const resolvers = { queries, mutations }; 