import { friendChatI, messageI } from "../Interfaces/message";
import { UPDATE_CHATS, CHAT_INIT } from "../constants/userConstants";
 
export const chatInit = (userId: string, chatList: messageI[]) => (dispatch: any) => {

    let tempObj = {
        [userId]: chatList
    }


    dispatch({ type: CHAT_INIT, payload: tempObj });


};


export const appendMsg = (friendId: string, msg: messageI) => (dispatch: any) => {



    dispatch({ type: UPDATE_CHATS, payload: { friendId, msg } });


};
