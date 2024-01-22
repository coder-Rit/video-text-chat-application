
import { messageModel } from "../../model/messageModel";

import { GraphQLError } from "graphql";



const queries = {

  getChats: async (_: any, payload: { friendId: string, myId: string, load: number }, context: { id: string }) => {
    if (!context.id) {
      return new GraphQLError("User not Varified")
    }
    const { friendId, myId, load } = payload;

    let messages = await messageModel.find({
      $or: [
        { senderId: friendId, receiverId: myId },
        { receiverId: friendId, senderId: myId },
      ],
    }).sort({ createdAt: -1 }).limit(load)
 
    messages.reverse()
    const tempObj = {
      friendId: friendId,
      chats: messages
    }

    return tempObj

  },


  loadInitialChats: async (_: any, payload: { friendIds: string[], myId: string }, context: { id: string }) => {
    if (!context.id) {
      return new GraphQLError("User not Varified")
    }

    const { friendIds, myId } = payload;

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