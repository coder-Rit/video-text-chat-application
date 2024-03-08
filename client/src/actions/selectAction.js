import {
  FRIEND_NOT_SELECTED,
  FRIEND_SELECTED,
  MESSAGE_NOT_SELECTED,
  MESSAGE_SELECTED,
} from "../constants/userConstants";

export const selectFriend = (  idx) => (dispatch) => {
  dispatch({ type: FRIEND_SELECTED,   idx });
};

export const selectNotFriend = () => (dispatch) => {
  dispatch({ type: FRIEND_NOT_SELECTED });
};




export const selectMessage = (idx) => (dispatch) => {
  dispatch({ type: MESSAGE_SELECTED,  idx });
};

export const selectNotMessage = () => (dispatch) => {
  dispatch({ type: MESSAGE_NOT_SELECTED });
};
