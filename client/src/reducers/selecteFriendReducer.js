import {
    
    FRIEND_SELECTED,
    FRIEND_NOT_SELECTED
  } from "../constants/userConstants";
    
  
  export const selecteFriendReducer = (state = { selectedFriend: {} }, action) => {
    switch (action.type) {
      
      case FRIEND_SELECTED:
        return {
          isFriendSelected: true,
          selectedFriend:action.payload
        };
      
      case FRIEND_NOT_SELECTED:
        return {
          isFriendSelected: false,
          selectedFriend:{}
        };
      
     
      default:
        return state;
    }
  };
  
  
  
  
   
  