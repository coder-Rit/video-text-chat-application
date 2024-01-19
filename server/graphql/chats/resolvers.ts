import { Types } from "mongoose";
import { User, UserModel } from "../../model/userModel";
import { messageModel } from "../../model/messageModel";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";



const queries = {

  getChats: async (_: any, payload: { friendId: string, myId: string }) => {
    const { friendId, myId } = payload;

    let messages = await messageModel.find({
      $or: [
        { senderId: friendId, receiverId: myId },
        { receiverId: friendId, senderId: myId },
      ],
    }).sort({ createdAt: -1 }).limit(15)

    messages.reverse()
    const tempObj = {
      friendId: friendId,
      chats: messages 
    }

    return tempObj

  },
  loadInitialChats: async (_: any, payload: { friendIds: string[],myId:string }) => {
    const {friendIds,myId} = payload;

    let allChats = []

    for (let i = 0; i < friendIds.length; i++) {
      const id = friendIds[i]
      let messages = await messageModel.find({
        $or: [
          { senderId: id, receiverId: myId },
          { receiverId: id, senderId: myId },
        ],
      }).sort({ createdAt: -1 }).limit(1)
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