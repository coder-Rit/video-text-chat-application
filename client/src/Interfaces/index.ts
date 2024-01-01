import { FriendInterface, siderStateInterface } from "./common";
import { allFriendsChatI, allfriendsTriI, friendChatI, state_allFrineds } from "./message";
import { UserListInterface, userInterface } from "./user";

export interface rootState {
  user: userInterface,
  userList: UserListInterface,
  siderState: siderStateInterface,
  selectedFriend:FriendInterface,
  // chats:allFriendsChatI[],
  chats:state_allFrineds
}