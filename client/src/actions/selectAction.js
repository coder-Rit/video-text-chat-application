import { FRIEND_NOT_SELECTED, FRIEND_SELECTED } from "../constants/userConstants";

export const selectFriend = (friend) => (dispatch) => {
  
    dispatch({ type: FRIEND_SELECTED,payload:friend });
 
 
};

export const selectNotFriend = (friend) => (dispatch) => {
  
    dispatch({ type: FRIEND_NOT_SELECTED});
 
 
};

