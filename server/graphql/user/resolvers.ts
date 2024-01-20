import { Types } from "mongoose";
import { User, UserModel } from "../../model/userModel";
import { messageModel } from "../../model/messageModel";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";


interface tokenPayload {
  id: string
}


const queries = {
  loadUser: async (
    _: any,
    payload: { token: string }, context: { id: string }
  ) => {
    if (!context.id) {
      return new GraphQLError("User not Varified")
    }
    try {
      const tokenData = jwt.decode(payload.token, { complete: true }) as { payload: tokenPayload } | null;

      if (!tokenData) {
        throw new Error("something went wrong")
      }

      const user = await UserModel.findById(tokenData?.payload.id)
      if (!user) {
        throw new Error("user not found")
      }

      const Friends = await UserModel.find({ _id: { $in: user.idList } })


      user.token = payload.token
      user.friendList = Friends
      return user;

    } catch (error: any) {

      throw new Error(error)
    }

  },
  userLogin: async (
    _: any,
    payload: { email: string, password: string }
  ) => {
    try {
      console.log(payload);

      if (!payload.email || !payload.password) {
        throw new Error("Please provide email and password")
      }

      const user = await UserModel.findOne({ email: payload.email })
      if (!user) {
        throw new Error("User or Password is incorrect.")
      }
      const isReady = await user.comparePassword(payload.password)

      const Friends = await UserModel.find({ _id: { $in: user.idList } })


      if (isReady) {
        const token = user.getJWTtoken();
        user.token = token
        user.friendList = Friends
        return user;
      } else {
        throw new Error("User or Password is incorrect")
      }


    } catch (error: any) {
      throw new Error(error)
    }

  },
  searchFriend: async (_: any, payload: { userName: string, load: number }) => {
    
    try {
      const regex = new RegExp(payload.userName, 'i')
      const users = await UserModel.find({ userName: regex })
        .limit(payload.load).exec()

      console.log(regex);

      return users

    } catch (error) {
      throw new Error("Unable to find the Users")

    }



  },


};




const mutations = {
  createUser: async (_: any, payload: User) => {
    try {

      console.log("payload", payload);
      let res = await UserModel.create(payload);
      const token = res.getJWTtoken();
      res.token = token
      return res;
    } catch (error) {
      // Handle error, e.g., log or throw
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },
  addFriend: async (_: any, payload: { Fid: Types.ObjectId, Mid: Types.ObjectId }, context: { id: string }) => {
    if (!context.id) {
      return new GraphQLError("User not Varified")
    }

    try {

      const MidUser = await UserModel.findById(payload.Mid)

      let isFriendExist = false;

      if (MidUser?.idList.indexOf(payload.Fid) !== -1) {
        isFriendExist = true;
      }

      let newUser: any;

      // remove friend
      if (!isFriendExist) {
        newUser = await UserModel.findByIdAndUpdate({
          _id: payload.Mid
        }, {
          $push: { idList: payload.Fid }
        }, {
          new: true
        })

        await UserModel.findByIdAndUpdate({
          _id: payload.Fid
        }, {
          $push: { idList: payload.Mid }
        })



      } else {

        newUser = await UserModel.findByIdAndUpdate({
          _id: payload.Mid
        }, {
          $pull: { idList: payload.Fid }
        }, {
          new: true
        })
        await UserModel.findByIdAndUpdate({
          _id: payload.Fid
        }, {
          $pull: { idList: payload.Mid }
        })

      }

      const Friends = await UserModel.find({ _id: { $in: newUser.idList } })

      newUser.friendList = Friends

      return newUser


    } catch (error) {

      throw new Error('Failed to add friend user');
    }


  }


};


export const resolvers = { queries, mutations };  