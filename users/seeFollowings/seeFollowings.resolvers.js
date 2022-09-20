import client from "../../client"

export default {
    Query:{
        seeFollowings: async(_,{username, cursor}) =>{
            try{
                const target = await client.user.findUnique({
                    where:{username},
                    select:{id:true},
                })
                if (!target)
                    throw Error("user is not found");
                const followings = await client.user.findUnique({
                    where:{username}
                }).following({
                    take: 3,
                    skip: cursor ? 1 : 0,
                    ...(cursor && {cursor: {id: cursor}})
                })
                return {
                    ok: true,
                    followings
                }
            }catch(e){
                return {
                    ok: false,
                    error: e.message
                }
            }
        }
    }
}