import { FriendInterface, siderStateInterface } from "./common";
import { friendChatI } from "./message";
import { UserListInterface, userInterface } from "./user";

export interface rootState {
  user: userInterface,
  userList: UserListInterface,
  siderState: siderStateInterface,
  selectedFriend:FriendInterface,
  chats:friendChatI,
}