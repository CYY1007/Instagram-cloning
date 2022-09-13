require('dotenv').config();

import { ApolloServer,gql } from "apollo-server";
import schema from "./schema";
import { getUser,protectResolvers } from "./users/users.utils";



const server = new ApolloServer({
    schema,
    context: async ({req}) =>{
        return {
            loggedInUser: await getUser(req.headers.authorization),
            protectResolvers
        }
    },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`))