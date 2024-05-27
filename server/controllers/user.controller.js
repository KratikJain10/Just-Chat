import User from "../models/user.models.js";

export const getUsersForSidebar=async(req,res)=>{
    console.log("reached here");
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
         res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("error in getUserForSidebar:",error.message);
        res.status(500).json({error:"internal server error"});
    }


}