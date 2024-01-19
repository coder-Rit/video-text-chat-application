export const queries = `#graphql
    getChats(friendId:ID,myId:ID):FriendChatT
    loadInitialChats(friendIds:[ID],myId:ID):[FriendChatT]
`; 