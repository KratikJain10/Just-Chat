import express from "express"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";



export const signUp=async(req,res)=>{
      try {
        const {fullname,username,password,confirmPassword,gender}=req.body;
        if(password!=confirmPassword){
          return res.status(400).json({error:"passwords do not match"} );
        }
        const user=await User.findOne({username});
        if(user){
          return res.status(400).json({error:"username already exists"});
        }

        //hash password here
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);




        //Profile piture assignment here
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser=new User({
          fullname,
          username,
          gender,
          password:hashedPassword,
          profilePic:gender==='male'?boyProfilePic:girlProfilePic
        })
        if(newUser){
          generateTokenAndSetCookie(newUser._id,res);
          await newUser.save();
          res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilePic:newUser.profilePic,
            gender:newUser.gender,
          })
        }else{
          res.status(400).json({error:"invalid user data"});
        }
        

        

      } catch (error) {
        console.log("error in signUp controller",error.message);
        res.status(500).json({error:"Internal server error"})
      }
        
};
    

export const login=async(req,res)=>{

   try {
      const{username,password}=req.body;
      const user=await User.findOne({username});
      const isPasswordCorrect= await bcrypt.compare(password,user?.password || "");
      if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"});
      }

      generateTokenAndSetCookie(user._id,res);


      res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilePic:user.profilePic,
      })

   } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({error:"Internal server error"});
   }


};
        

export const logout=(req,res)=>{
    try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({message:"Logout succesfully"})
    } catch (error) {
      console.log("error in logout controller",error.message);
      res.status(500).json({error:"Internal server error"})
    }
    
};