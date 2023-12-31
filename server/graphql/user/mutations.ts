export const mutations = `#graphql
    createUser(userName:String, firstName: String!, lastName: String, email: String!, password: String!,profileImageURL:String!): User
    addFriend(Fid:String!,Mid:String!):User

`;