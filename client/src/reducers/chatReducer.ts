import { UPDATE_CHATS,CHAT_INIT, SET_URL_IN_MESSAGE } from "../constants/userConstants";
import { actionI } from "../Interfaces/common";
import {friendChatI, messageI} from "../Interfaces/message"


function findLastIndex(arr:messageI[], callback:(obj:messageI)=>boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (callback(arr[i])) {
      return i;
    }
  }
  return -1; // Return -1 if the element is not found
}



export const chatReducer = (state:friendChatI|any =  {} , action:actionI ) => {
    switch (action.type) {
      
      case CHAT_INIT:
        return {
          ...state,
          ...action.payload as any
        } 
      case UPDATE_CHATS:

        const {friendId,msg} = action.payload

        return {
          ...state,
          [friendId]:[...state[friendId],...msg]
        } 
     
      case SET_URL_IN_MESSAGE:
        const {url,uuid,senderId} = action.payload 
        const len = state[senderId].length-1;  
         
        const index = findLastIndex(state[senderId], (obj) => obj.uuid === uuid);

        state[senderId][index].fileData.url = url

        return {
           ...state
        } 

      default:
        return state;
    }
  };
  