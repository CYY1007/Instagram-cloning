import client from "../../client"
import { protectResolvers } from "../users.utils"

const followUserResolver = async(_,{username},{loggedInUser}) =>{
    try{
        const findToFollow = await client.user.findUnique({
            where:{username}
        });
        if (!findToFollow)
            throw Error("the user is not found")
        await client.user.update({
        where:{
            id:loggedInUser.id
        },
        data:{
            following:{
                connect:{
                    username
                }
            }
        }
    })
    return{
        ok: true,
    }
    }catch(e){
        return{
            ok: false,
            error: e.message
        }
    }
}

export default {
    Mutation:{
        followUser: protectResolvers(followUserResolver),
    }
}