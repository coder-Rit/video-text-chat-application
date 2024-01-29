import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  USER_LIST,
  DELETE_FRIEND
} from "../constants/userConstants";
import Cookies from "js-cookie";
export const register = (userData,success) => (dispatch) => {
  if (success) {
    Cookies.set('authToken', userData.token, { expires: 7 })
     
    dispatch({ type: REGISTER_USER_REQUEST });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: userData });
  }else{
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: "Account created successfully.",
    });
  }
  
};
export const loadUser = (userData,success) => (dispatch) => {

  if (success) {
    Cookies.set('authToken', userData.token, { expires: 7 })
    dispatch({ type: LOAD_USER_REQUEST });
    dispatch({ type: LOAD_USER_SUCCESS, payload: userData });
  }else{
    dispatch({
      type: LOAD_USER_FAIL,
      payload: "LogIn",
    });
  }
}
  
export const LoginAction = (userData,success) => (dispatch) => {
  if (success) {
    Cookies.set('authToken', userData.token, { expires: 7 })
    
    dispatch({ type: LOAD_USER_REQUEST });
    dispatch({ type: LOAD_USER_SUCCESS, payload: userData });
  }else{
    dispatch({
      type: LOAD_USER_FAIL,
      payload: "LogIn",
    });
  }
  
}; 


export const logOut = () => (dispatch) => {
  Cookies.remove('authToken')
    dispatch({ type: LOGOUT_USER_REQUEST });
  
};

export const updateFriendList = (userData ,newFriendList) => (dispatch) => {
  let upUserData =JSON.parse(JSON.stringify(userData))
  upUserData.friendList = newFriendList
    dispatch({ type: LOAD_USER_SUCCESS ,payload:upUserData});
  
};
export const userList = (list) => (dispatch) => {
  
     dispatch({ type: USER_LIST,payload:list });
  
  
};

export const removeFriend = (index) => (dispatch) => {
  dispatch({ type: DELETE_FRIEND, payload: { index } });
};
