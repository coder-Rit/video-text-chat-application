import {
  CLEAR_ERRORS, 
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  USER_LIST
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

    case CLEAR_ERRORS:
      return {
        ...state,
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




 
