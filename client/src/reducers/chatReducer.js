import { UPDATE_CHATS,CHAT_INIT } from "../constants/userConstants";



export const chatReducer = (state =  {} , action) => {
    switch (action.type) {
      
      case CHAT_INIT:
        return {
          ...state,
          ...action.payload
        } 
      case UPDATE_CHATS:

        const {friendId,msg} = action.payload

        return {
          ...state,
          [friendId]:[...state[friendId],msg]
        } 
     
      default:
        return state;
    }
  };
  