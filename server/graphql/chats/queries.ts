export const queries = `#graphql
    getChats(friendId:ID):FriendChatT
    loadInitialChats(friendIds:[ID]):[FriendChatT]
`; 