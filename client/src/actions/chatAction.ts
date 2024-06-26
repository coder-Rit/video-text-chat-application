import { SET_DELIVERY_STATUS_I, friendChatI, messageI, urlUpdateObjectI } from "../Interfaces/message";
import { UPDATE_CHATS, CHAT_INIT,SET_DELEIVERY_STATUS_TO_SEEN, SET_URL_IN_MESSAGE, BULK_CHAT_INIT, SET_DELIVERY_STATUS } from "../constants/userConstants";

export const chatInit = (userId: string, chatList: messageI[]) => (dispatch: any) => {

    
    let tempObj = {
        [userId]: chatList
    }

    dispatch({ type: CHAT_INIT, payload: tempObj });

};
export const BulkChatInit = (directState: friendChatI) => (dispatch: any) => {

    dispatch({ type: BULK_CHAT_INIT, payload: directState });

};


export const appendMsg = (friendId: string, msg: messageI[]) => (dispatch: any) => {
    console.log("message", msg);
    dispatch({ type: UPDATE_CHATS, payload: { friendId, msg } });

};

export const updateUrl = (urlUpdateObject: urlUpdateObjectI, userId: string) => (dispatch: any) => {
    const { uuid, url, senderId, receiverId } = urlUpdateObject
    dispatch({ type: SET_URL_IN_MESSAGE, payload: { uuid, url, senderId, receiverId }, userId });
};


export const updateDeliveryStatus = (data:SET_DELIVERY_STATUS_I ) => (dispatch: any) => {

    dispatch({ type: SET_DELIVERY_STATUS,payload:data });
};


export const updateUnseenChatToSeen = (id : string ) => (dispatch: any) => {

    dispatch({ type: SET_DELEIVERY_STATUS_TO_SEEN,payload:id });
};


