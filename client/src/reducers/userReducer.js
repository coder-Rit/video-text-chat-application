import {
  CLEAR_ERRORS, 
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  USER_LIST,
  OPEN_SIDER,
  CLOSE_SIDER,
  DELETE_FRIEND,
  UPDATE_USER_STATUS
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
 
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false, 
        error: action.payload,
      };
    case LOGOUT_USER_REQUEST:
      return {
        loading: false,
        isAuthenticated: false, 
        error: {},
      };


    case UPDATE_USER_STATUS :
      return {
        ...state,
        user:action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };



    case DELETE_FRIEND:
       
      // let newFriendList = JSON.parse(JSON.stringify(state.user.friendList));
      // let idx = newFriendList.findIndexOf((data)=>data.id===action.userId)
      state.user.friendList.slice(action.payload.index,1)
      let newUserState = state.user
      
      return {
        ...state,
        user:newUserState,
        error: null,
      };
    default:
      return state;
  }
};


export const userList = (state = { users: {} }, action) => {
  switch (action.type) {
    
    case USER_LIST:
      return {
        users: action.payload,
      };
  
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const changeSiderState = (state = { isSiderOpen: false }, action) => {
  switch (action.type) {
    
    case OPEN_SIDER:
      return {
        isSiderOpen: true,
      };
    case CLOSE_SIDER:
      return {
        isSiderOpen: false,
      };
  
   
    default:
      return state;
  }
};




 
