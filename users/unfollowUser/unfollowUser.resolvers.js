import client from "../../client"
import { protectResolvers } from "../users.utils"

const UnfollowUserResolver = async(_,{username},{loggedInUser}) =>{
    try{
    const findTounfollow = await client.user.findUnique({
        where: {username}
    });
    if (!findTounfollow)
        throw Error("user is not found")
    await client.user.update({
        where:{id:loggedInUser.id},
        data:{
            following:{
                disconnect:{
                    username,
                }
            }
        }
    })
    return {
        ok: true,
    }
    }catch(e){
        return{
            ok: false,
            error: e.message
        }
    }
}

export default{
    Mutation:{
    UnfollowUser:protectResolvers(UnfollowUserResolver),
    }
}