export interface User {
  id?:string;
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string | null;
  profileImageURL: string;
  friendList:User[];
  lastSeen:string

}
export interface userInterface {
  user: User,
  loading: boolean,
  isAuthenticated: boolean
}

export interface UserListInterface {
  users:[User]
}

