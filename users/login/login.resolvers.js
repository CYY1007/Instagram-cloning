import client from "../../client"
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"

export default {
    Mutation:{
        login : async (_,{username,password}) => {
            const user =  await client.user.findFirst({
                where: {username}
            })
            if(!user){
                return {
                    ok: false,
                    error : "Incorrect Password or username",
                }
            }
            const checkPass = await bcrypt.compare(password,user.password);
            if (!checkPass){
                return {
                    ok:false,
                    error : "Incorrect Password or username"
                }
            }
            const token = jwt.sign({id:user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
        }
    }
}  