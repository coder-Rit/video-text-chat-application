import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";

import {thunk} from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { changeSiderState, userList, userReducer } from "./reducers/userReducer";
import { selecteFriendReducer } from "./reducers/selecteFriendReducer";
 
const combinedReducer = combineReducers({
  user: userReducer,
  userList:userList,
  siderState:changeSiderState,
  selectedFriend:selecteFriendReducer
  
  
});
let initalState = {};

const middleWare = [thunk];

const store = createStore( 
  combinedReducer,
  initalState, 
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
