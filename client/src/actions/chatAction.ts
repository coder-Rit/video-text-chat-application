import { allfriendsTriI, friendChatI, messageI } from "../Interfaces/message";
import { UPDATE_CHATS } from "../constants/userConstants";

// export const chatInit = (allFriendsChat:friendChatI[]) => (dispatch:any) => {


//     dispatch({ type: UPDATE_CHATS,payload:allFriendsChat });


// };
export const chatInit = (allFriendsChat: allfriendsTriI) => (dispatch: any) => {


    dispatch({ type: UPDATE_CHATS, payload: allFriendsChat });


};


export const appendMsg = (allFriendsChat: allfriendsTriI, friendId: string, msg: messageI) => (dispatch: any) => {


    //    const currentFriendIndex =  allFriendsChat.findIndex((data)=>{
    //         return data.friendId === friendId
    //     })

    //     allFriendsChat[currentFriendIndex].chats.push(msg)


    let firendmsg = allFriendsChat[friendId]
    firendmsg.push(msg)
    // let allFriendsChatnew = allFriendsChat
    // allFriendsChatnew[friendId]= firendmsg


    
    dispatch({ type: UPDATE_CHATS, payload: allFriendsChat });


};
