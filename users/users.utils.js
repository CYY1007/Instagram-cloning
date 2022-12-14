import jwt from "jsonwebtoken"
import client from "../client";

export const getUser = async(token) => {
    try{
    if(!token){
        return null;
    }
    const {id} = jwt.verify(token,process.env.SECRET_KEY);
    const user = await client.user.findUnique({
        where:{id}
    });
    if (user){
        return user;
    }
    else{
        return null;
        }
    }catch(e){
        return null;
    }
}

export const protectResolvers = (resolver) => (root,args, context, info) =>{
    if (!context.loggedInUser){
        return {
            ok: false,
            error: "you need login first"
        }
    }
    return resolver(root,args,context,info);
}