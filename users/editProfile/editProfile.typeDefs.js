import { gql } from "apollo-server";

export default gql`
type Mutation{
    editProfile(firstName: String,
    lastName: String,
    username: String,
    email: String,
    password:String,
    ): editProfileResult
}
type editProfileResult{
    ok: Boolean
    error: String
}
`
