import client from "../../client"
import bcrypt from "bcrypt"

export default{
    Mutation: {
        editProfile: async (_,{
            firstName,
            lastName,
            username,
            email,
            password:unHashedPass},{loggedInUser,protectResolvers},) => {
                try{
                protectResolvers(loggedInUser);
                let hashedPassword = null;
                if (unHashedPass){
                    hashedPassword = await bcrypt.hash(unHashedPass,8);
                }
                const updatedUser = await client.user.update({
                    where:{
                        id:loggedInUser.id
                    },
                    data:{
                        firstName,
                        lastName,
                        username,
                        email,
                        ...(hashedPassword && {password: hashedPassword}),
                    }
                })
                if (updatedUser.id){
                    return {
                        ok: true
                    }
                }
                else{
                    return {
                        ok: false,
                        error:"can't update profile"
                    }
                }
        } catch(error){
            return {
                ok: false,
                error
            }
        }
    }
    }
}