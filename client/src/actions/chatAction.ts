import {  friendChatI, messageI } from "../Interfaces/message";
import { UPDATE_CHATS } from "../constants/userConstants";

// export const chatInit = (allFriendsChat:friendChatI[]) => (dispatch:any) => {


//     dispatch({ type: UPDATE_CHATS,payload:allFriendsChat });


// };
export const chatInit = (allFriendsChat: friendChatI[]) => (dispatch: any) => {

    let data = JSON.parse(JSON.stringify(allFriendsChat))

    dispatch({ type: UPDATE_CHATS, payload: data });


};


export const appendMsg = (allFriendsChat: friendChatI[], friendId: string, msg: messageI) => (dispatch: any) => {

 
     

       const currentFriendIndex =  allFriendsChat.findIndex((data)=>{
            return data.friendId === friendId
        })
        console.log(currentFriendIndex);
        
        let newAllchats = allFriendsChat
         
        let chatarr =  allFriendsChat[currentFriendIndex] 
         
        chatarr.chats.push(msg);
         
    
    dispatch({ type: UPDATE_CHATS, payload: newAllchats });


};
