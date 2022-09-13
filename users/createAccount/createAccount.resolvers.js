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
                    return client.user.create({data:{
                        username,email,firstName,lastName,password:hashedPassword
                    }})
                }catch(e){
                    return e;
                }
            },
    }
}  