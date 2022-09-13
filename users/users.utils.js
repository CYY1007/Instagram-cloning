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

export const protectResolvers = (user) =>{
    console.log("protect!")
    if(!user){
        throw new Error("You need to login");    
    }
}