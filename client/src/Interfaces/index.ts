import { User, UsersList, userInterface } from "./user";

export interface rootState {
    user: userInterface,
    users:UsersList
  }