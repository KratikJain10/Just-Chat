import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
export const sendMessage=async(req,res)=>{


    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        
       let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            message,

        })

        if(newMessage){
            conversation.messages.push(newMessage._id);

        }
        //await conversation.save();--1 second
        //await newMessage.save();--1 second
        //this one run in parallel-- 1 second
        await Promise.all([conversation.save(),newMessage.save()]);

            //socket io functionality here for real time chat
            const recieverSocketId=getReceiverSocketId(receiverId);
            if(recieverSocketId){
                //io.to sending event to specific client
                io.to(recieverSocketId).emit("newMessage",newMessage);
            }
        res.status(201).json(newMessage);



    } catch (error) {
        console.log("error in sendMessage Controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }


}


export const getMessage=async(req,res)=>{

try {
    const {id:userToChatId}=req.params;
    const senderId=req.user._id;
    const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
    }).populate("messages");//not referance but actual messages

    if(!conversation){
        return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
} catch (error) {
    console.log("error in getMessage Controller",error.message);
    res.status(500).json({error:"Internal server error"});
}

}