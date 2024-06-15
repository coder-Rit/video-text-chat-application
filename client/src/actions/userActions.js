import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  USER_LIST,
  DELETE_FRIEND,
  UPDATE_USER_STATUS,
  UPDATE_FRIEND_LIST
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






export const updateUsersStatus=(statusList,user)=>(dispatch)=>{
  let temp_statusList = statusList
  let temp_user = JSON.parse(JSON.stringify(user))

  for (let i = 0; i < user.friendList.length; i++) {
    const elm1 = user.friendList[i];

    for (let j = 0; j < temp_statusList.length; j++) {
      const elm2 = temp_statusList[j];

      if (elm1.id===elm2.id) {
        temp_user.friendList[i].lastSeen = elm2.lastSeen
         break;
      }

      
    }
    
  } 

   dispatch({ type: UPDATE_USER_STATUS, payload: temp_user  });

}


export const updateOnlineStatus=(onlineUsersList, friendList)=>(dispatch)=>{
    //  console.log(onlineUsersList,friendList);

    const newFriendList =  friendList.map(friend=>{
      let temp_friend = JSON.parse(JSON.stringify(friend))

      if (onlineUsersList.includes(friend.id)) {
        temp_friend.lastSeen = "online"
      }else{
        temp_friend.lastSeen = friend.lastSeen
      }
      return temp_friend
      
     })
  
    dispatch({ type: UPDATE_FRIEND_LIST, payload: newFriendList  });

}