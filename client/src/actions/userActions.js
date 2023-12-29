import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  USER_LIST
} from "../constants/userConstants";
import cookie from "js-cookie";
export const register = (userData,success) => (dispatch) => {
  if (success) {
     
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
  cookie.remove('authToken')
    dispatch({ type: LOGOUT_USER_REQUEST });
  
};
export const userList = (list) => (dispatch) => {
  
     dispatch({ type: USER_LIST,payload:list });
  
  
};
