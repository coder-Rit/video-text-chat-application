import { UPDATE_CHATS } from "../constants/userConstants";



export const chatReducer = (state =  {AllfriendChats:[]} , action) => {
    switch (action.type) {
      
      case UPDATE_CHATS:
        return {
          ...state,
          AllfriendChats:action.payload
        }
        
      
   
     
      default:
        return state;
    }
  };
 