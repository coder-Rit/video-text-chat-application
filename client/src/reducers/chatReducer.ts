import { UPDATE_CHATS, CHAT_INIT, SET_URL_IN_MESSAGE, BULK_CHAT_INIT, SET_DELIVERY_STATUS, SET_DELEIVERY_STATUS_TO_SEEN } from "../constants/userConstants";
import { actionI } from "../Interfaces/common";
import { friendChatI, messageI, SET_DELIVERY_STATUS_I } from "../Interfaces/message"





function findLastIndex(arr: messageI[], callback: (obj: messageI) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (callback(arr[i])) {
      return i;
    }
  }
  return -1; // Return -1 if the element is not found
}





export const chatReducer = (state: friendChatI | any = {}, action: actionI | any) => {
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
      const { friendId, msg } = action.payload


      return {
        ...state,
        [friendId]: [...state[friendId], ...msg]
      }

    case SET_URL_IN_MESSAGE:
      let { url, uuid, senderId, receiverId } = action.payload
      if (senderId === action.userId) {
        senderId = receiverId
      }
      const index = findLastIndex(state[senderId], (obj) => obj.uuid === uuid);
      state[senderId][index].fileData.url = url
      return {
        ...state
      }




    case SET_DELIVERY_STATUS:
      let { uuidList, next_status }: SET_DELIVERY_STATUS_I = action.payload
      let newState = JSON.parse(JSON.stringify(state))

      uuidList.forEach(uuid => {
        const index2 = findLastIndex(state[action.payload.receiverId], (obj) => obj.uuid === uuid);

        newState[action.payload.receiverId][index2].delivery = next_status
      })

      return {
        ...newState
      }


    case SET_DELEIVERY_STATUS_TO_SEEN:
      const arr = state[action.payload]
      let newStateSeen = JSON.parse(JSON.stringify(state))
      

      for (let i = arr.length - 1; i >= 0; i--) {
        const msg = arr[i]
        if (msg.delivery !== "seen") {
          newStateSeen[action.payload][i].delivery = "seen";
        }
      }
      return {
        ...newStateSeen
      }

    default:
      return state;
  }
};
