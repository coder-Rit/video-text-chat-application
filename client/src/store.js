import { applyMiddleware, combineReducers, createStore } from "redux";

import {thunk} from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { userList, userReducer } from "./reducers/userReducer";
 
const combinedReducer = combineReducers({
  user: userReducer,
  userList:userList
  
  
});
let initalState = {};

const middleWare = [thunk];

const store = createStore( 
  combinedReducer,
  initalState, 
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
