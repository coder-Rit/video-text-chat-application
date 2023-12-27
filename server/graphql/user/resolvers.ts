import { User, UserModel } from "../../model/userModel";




const queries = {
    // getUserToken: async (
    //   _: any,
    //   payload: { email: string; password: string }
    // ) => {
    //   const token = await UserService.getUserToken({
    //     email: payload.email,
    //     password: payload.password, 
    //   });
    //   return token;
    // },
    // getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    //   if (context && context.user) {
    //     const id = context.user.id;
    //     const user = await UserService.getUserById(id);
    //     return user;
    //   } 
    //   throw new Error("I dont know who are you");
    // },
  };
  
  const mutations = {
    createUser: async (_: any, payload: User) => {
      try {
        
        console.log("payload",payload);
        let res = await UserModel.create(payload);
        const token =   res.getJWTtoken();
        res.token = token
        console.log(res);
          
        return res;
      } catch (error) {
        // Handle error, e.g., log or throw
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },
  };
  
  
  export const resolvers = { queries, mutations };