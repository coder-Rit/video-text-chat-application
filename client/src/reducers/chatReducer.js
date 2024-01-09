import { UPDATE_CHATS } from "../constants/userConstants";



export const chatReducer = (state =  {} , action) => {
    switch (action.type) {
      
      case UPDATE_CHATS:
        return {
          ...state,
          ...action.payload
        } 
     
      default:
        return state;
    }
  };
  