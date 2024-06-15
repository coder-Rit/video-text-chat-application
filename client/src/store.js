import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { changeSiderState, userReducer } from "./reducers/userReducer";
import { selecteFriendReducer } from "./reducers/selecteFriendReducer";
import { chatReducer } from "./reducers/chatReducer";
import { selectMessage } from "./reducers/selecteFriendReducer";

const combinedReducer = combineReducers({
  user: userReducer,
  siderState: changeSiderState,
  selectedFriend: selecteFriendReducer,
  chats: chatReducer,
  selecteMessage: selectMessage,
});
let initalState = {}; 

const middleWare = [thunk];

const store = createStore(
  combinedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
