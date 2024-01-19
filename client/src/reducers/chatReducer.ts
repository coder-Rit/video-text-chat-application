import { useSelector } from "react-redux";
import { UPDATE_CHATS,CHAT_INIT, SET_URL_IN_MESSAGE, BULK_CHAT_INIT } from "../constants/userConstants";
import { actionI } from "../Interfaces/common";
import {friendChatI, messageI} from "../Interfaces/message"
import { rootState } from "../Interfaces";
import { userInterface } from "../Interfaces/user";


function findLastIndex(arr:messageI[], callback:(obj:messageI)=>boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (callback(arr[i])) {
      return i;
    }
  }
  return -1; // Return -1 if the element is not found
}



export const chatReducer = (state:friendChatI|any =  {} , action:actionI |any) => {
    switch (action.type) {
      
      case CHAT_INIT:
        return {
          ...state,
          ...action.payload as any
        } 
      case BULK_CHAT_INIT:
        return {
          ...action.payload as any
        } 
      case UPDATE_CHATS: 
        const {friendId,msg} = action.payload

        return {
          ...state,
          [friendId]:[...state[friendId],...msg]
        } 
     
      case SET_URL_IN_MESSAGE:
        let {url,uuid,senderId,receiverId} = action.payload 
        
        if (senderId === action.userId) {
          senderId = receiverId
        }
         
        const index = findLastIndex(state[senderId], (obj) => obj.uuid === uuid);

        state[senderId][index].fileData.url = url

        return {
           ...state
        } 

      default:
        return state;
    }
  };
  