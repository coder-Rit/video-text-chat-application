import { User } from "./user";

 

export interface siderStateInterface {
    isSiderOpen: boolean,
    
  }

  export interface  FriendInterface{
    isFriendSelected: boolean,
    idx:number,
    selectedFriend:User
  }


  interface onlineStatusChecker_I {
    myId: string,
    friendsIds: string[]
  }