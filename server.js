require('dotenv').config();
import express from "express"
import logger from "morgan"
import { ApolloServer} from "apollo-server-express";
import {typeDefs,resolvers}from "./schema";
import { getUser,protectResolvers } from "./users/users.utils";



const server = new ApolloServer({
    typeDefs,resolvers,
    context: async ({req}) =>{
        return {
            loggedInUser: await getUser(req.headers.authorization),
            protectResolvers
        }
    },
});

const app = express();

server.applyMiddleware({app});
app.use(logger("dev"));
app.use("/static", express.static("uploads"));
const PORT = process.env.PORT;

app.listen({port:PORT},() => console.log(`🚀 Server is running on http://localhost:${PORT}`)); 