export const queries = `#graphql
    loadUser(token:String!):User
    userLogin(email:String!,password:String!):User
    searchFriend(userName:String!):[User]
`;