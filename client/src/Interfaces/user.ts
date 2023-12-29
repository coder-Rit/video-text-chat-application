export interface User {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string | null;
  profileImageURL: string;
}
export interface userInterface {
  user: User,
  loading: boolean,
  isAuthenticated: boolean
}

export interface UsersList {
  users:[User]
}

