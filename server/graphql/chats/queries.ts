export const queries = `#graphql
    getChats(friendId:ID,myId:ID,load:Int):FriendChatT
    loadInitialChats(friendIds:[ID],myId:ID):[FriendChatT]
`; 