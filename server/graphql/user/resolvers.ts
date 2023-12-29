import { User, UserModel } from "../../model/userModel";
import jwt from "jsonwebtoken";


interface tokenPayload {
  id: string
}


const queries = {
  loadUser: async (
    _: any,
    payload: { token: string }
  ) => {
    try {
      const tokenData = jwt.decode(payload.token, { complete: true }) as { payload: tokenPayload } | null;

      if (!tokenData) {
        throw new Error("something went wrong")
      }

      const user = await UserModel.findById(tokenData?.payload.id)
      if (!user) {
        throw new Error("user not found")
      }

      console.log(user);
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

      if (!payload.email || !payload.password) {
        throw new Error("Please provide email and password")
      }

      const user = await UserModel.findOne({ email: payload.email })
      if (!user) {
        throw new Error("User or Password is incorrect.")
      }


      const isReady = await user.comparePassword(payload.password)

      if (isReady) {
        const token = user.getJWTtoken();
        user.token = token
        return user;
      } else {
        throw new Error("User or Password is incorrect")
      }


    } catch (error: any) {
      throw new Error(error)
    }

  },
  searchFriend: async (_: any, payload: { userName: string }) => {

    try {
      const regex = new RegExp(payload.userName, 'i')
      const users = await UserModel.find({ userName: regex }).exec()

      console.log(regex);

      return users

    } catch (error) {
    }



  }
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
};


export const resolvers = { queries, mutations };