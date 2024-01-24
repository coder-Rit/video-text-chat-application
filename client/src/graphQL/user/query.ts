import gql from "graphql-tag";

export const LOAD_USER = gql`

query LoadUser($token: String!) {
  loadUser(token: $token) {
    id
    userName
    firstName
    lastName
    email
    profileImageURL
    token
    friendList {
      id
      userName
      firstName
      lastName
      profileImageURL
      lastSeen
    }
  }
}

`

export const LOGIN = gql`
query UserLogin($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    id
    userName
    firstName
    lastName
    email
    profileImageURL
    token
    friendList {
      id
      userName
      firstName
      lastName
      profileImageURL
      lastSeen
    }
  }
}

`

export const CREATE_USER = gql`
 
mutation CreateUser($firstName: String!, $email: String!, $password: String!, $profileImageURL: String!, $lastName: String, $userName: String) {
 createUser(firstName: $firstName, email: $email, password: $password, profileImageURL: $profileImageURL, lastName: $lastName, userName: $userName) {
   id
   userName
   firstName
   lastName
   email
   profileImageURL
   token
   friendList {
     id
     userName
     firstName
     lastName
     profileImageURL
     lastSeen
   }
 }
}
`;