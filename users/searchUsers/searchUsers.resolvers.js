import client from "../../client"

export default {
    Query : {
        searchUser: async(_,{keyword,page}) =>{
        try{
            if (!keyword)
                throw Error("keyword is lost..")
            const users = await client.user.findMany({
                where:{username: {
                    startsWith: keyword.toLowerCase()
                }},
                take: 5,
                skip: (page - 1) * 5,
            })
            return{
                ok: true,
                users,
                totalPages : Math.ceil(users.length / 5),
            }
        }catch(e){
            return {
                error: e.message,
                users: null,
                totalPages: null,
                ok:false,
            }
        }
    }
    }
}