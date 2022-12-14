import { gql } from "apollo-server"

export default gql`
type User {
    id: String!     
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatarURL: String
    following: [User]
    followers: [User]
    totalFollowers: Int!
    totalFollowings: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`