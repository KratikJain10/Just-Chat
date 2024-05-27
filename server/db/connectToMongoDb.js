import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToMongoDb= async()=>{

      try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mongoDb");
      } catch (error) {
        console.log("error connecting to mongodb",error.message);
      }

};


export default connectToMongoDb;