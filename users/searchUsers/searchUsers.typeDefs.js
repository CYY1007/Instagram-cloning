import { gql } from "apollo-server-express";

export default gql`
type searchResult{
    users: [User]
    totalPages: Int
    ok: Boolean
    error: String
}
type Query{
    searchUser(keyword:String!, page:Int!):searchResult
}
`