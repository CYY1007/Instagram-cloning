import client from "../../client"
import bcrypt from "bcrypt"

export default {
    Mutation:{
        createAccount : async (_,{firstName,
            lastName,
            username,
            email,
            password}) => {
                try{
                    const existingUser = await client.user.findFirst({
                        where: {
                            OR:[
                                {username},{email}
                            ]
                        },
                    })
                    if (existingUser){
                        throw new Error("This username/emial is already taken")
                    }
                    const hashedPassword =await bcrypt.hash(password,8);
                    const createdUser = await client.user.create({data:{
                        username,email,firstName,lastName,password:hashedPassword
                    }})
                    if (createdUser.id)
                        return{
                            ok: true,
                        }
                }catch(e){
                    return{
                        ok: false,
                        error: e.message,
                    }
                }
            },
    }
}  