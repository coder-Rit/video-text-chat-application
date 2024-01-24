import gql from "graphql-tag";

export const ADD_FRIEND = gql`

mutation AddFriend($fid: String!, $mid: String!) {
  addFriend(Fid: $fid, Mid: $mid) {
    friendList {
      userName
      profileImageURL
      id
      lastName
      firstName
    }
  }
}
`