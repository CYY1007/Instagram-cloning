import client from "../client";

export default {
    User:{
        totalFollowers: async ({id}) => client.user.count({
            where:{
                following:{
                    some:{id}
                }
            }
        }),
        totalFollowings: async ({id}) => client.user.count({
            where:{followers:{
                some:{
                    id
                }
            }}
        }),
        isMe: async ({id},_,{loggedInUser}) =>{
            console.log(id, loggedInUser);
            if (!loggedInUser)
                return false;
            return id === loggedInUser.id;
        },
        isFollowing : async ({id},_,{loggedInUser}) =>{
            if(!loggedInUser)
                return false;
            const exists = await client.user.findUnique({
                where: {username : loggedInUser.username}
            }).following({
                where:{
                    id
                }
            })
            //  const exists = await client.user.count({
            //     where:{
            //         username:loggedInUser.username,
            //         followers:{
            //             some:{
            //                 id
            //             }
            //         }
            //     }
            //  })
            return Boolean(exists);
        }
    }
}