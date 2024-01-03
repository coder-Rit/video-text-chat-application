import { FRIEND_NOT_SELECTED, FRIEND_SELECTED } from "../constants/userConstants";

export const selectFriend = (friend,idx) => (dispatch) => {
  
    dispatch({ type: FRIEND_SELECTED,payload:friend,idx});
 
 
};

export const selectNotFriend = ( ) => (dispatch) => {
  
    dispatch({ type: FRIEND_NOT_SELECTED});
 
 
};

