import {createWriteStream} from "fs"
import client from "../../client"
import bcrypt from "bcrypt"
import { protectResolvers } from "../users.utils";

const editProfileResolver = async (_,{firstName,lastName,username,email,password:unHashedPass,bio,avatarURL},{loggedInUser,protectResolvers},) => {
        try{
        let avatar = null;
        if (avatarURL){    
        const {filename,createReadStream} = await avatarURL
        const URL = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" +URL);
        readStream.pipe(writeStream);
        avatar = `http://localhost:4000/static/${URL}`;
    }
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
                bio,
                ...(avatar && {avatarURL: avatar}),
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

export default{
    Mutation: {
        editProfile: protectResolvers(editProfileResolver)
    }
}