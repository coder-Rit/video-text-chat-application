import {
  FRIEND_SELECTED,
  FRIEND_NOT_SELECTED,
  MESSAGE_SELECTED,
  MESSAGE_NOT_SELECTED
} from "../constants/userConstants";



export const selecteFriendReducer = (
  state = { selectedFriend: {} },
  action
) => {
  switch (action.type) {
    case FRIEND_SELECTED:
      return {
        isFriendSelected: true,
        idx: action.idx,
      };

    case FRIEND_NOT_SELECTED:
      return {
        isFriendSelected: false,
        idx: null,
      };

    default:
      return state;
  }
};


export const selectMessage = (state = { selectedMessage: {} }, action) => {
  switch (action.type) {
    case MESSAGE_SELECTED:
      return {
        isMessageSlected: true,
        messageIndex: action.idx,
      };

    case MESSAGE_NOT_SELECTED:
      return {
        isMessageSlected: false,
        messageIndex: 0,
      };

    default:
      return state;
  }
};