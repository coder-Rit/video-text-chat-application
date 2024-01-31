export const queries = `#graphql
    loadUser(token:String!):User
    userLogin(email:String!,password:String!):User
    searchFriend(userName:String!,load:Int):[User]
    getOnlineStatus(ids:[ID]):[onlineStatus]
`; 