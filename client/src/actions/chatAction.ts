import { friendChatI, messageI, urlUpdateObjectI } from "../Interfaces/message";
import { UPDATE_CHATS, CHAT_INIT,SET_URL_IN_MESSAGE ,BULK_CHAT_INIT} from "../constants/userConstants";
 
export const chatInit = (userId: string, chatList: messageI[]) => (dispatch: any) => {

    let tempObj = {
        [userId]: chatList
    }
 
    dispatch({ type: CHAT_INIT, payload: tempObj });
 
};
export const BulkChatInit = ( directState: friendChatI) => (dispatch: any) => {

    dispatch({ type: BULK_CHAT_INIT, payload: directState });
 
};


export const appendMsg = (friendId: string, msg: messageI[]) => (dispatch: any) => {
 
    dispatch({ type: UPDATE_CHATS, payload: { friendId, msg } });
 
};

export const updateUrl = (urlUpdateObject:urlUpdateObjectI) => (dispatch: any) => {
    const {uuid,url,senderId}=urlUpdateObject
    dispatch({ type: SET_URL_IN_MESSAGE, payload: { uuid,url,senderId } });


};
