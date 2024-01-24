import gql from "graphql-tag";

export const FIND_USER = gql`
 
 query SearchFriend($userName: String!, $load: Int) {
  searchFriend(userName: $userName, load: $load) {
    userName
    profileImageURL
    id
    lastName
      firstName
  }
}

`
export const LOAD_ALL_CHATS = gql`
query LoadInitialChats($friendIds: [ID], $myId: ID) {
  loadInitialChats(friendIds: $friendIds, myId: $myId) {
    friendId
    chats {
      type
      senderId
      receiverId
      msg
      createdAt
      fileData {
        fileName
      }
    }
  }
}
`
export const GET_CHATS = gql`
query GetChats($friendId: ID, $myId: ID, $load: Int) {
  getChats(friendId: $friendId, myId: $myId, load: $load) {
    friendId
    chats {
      senderId
      receiverId
      msg
      createdAt
      id
      fileData {
        mimeType
        fileSize
        fileName
        url
      }
      type
    }
  }
}

`