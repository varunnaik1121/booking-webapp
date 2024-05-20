import express,{Request,Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.get("/api/test",async(req:Request,res:Response)=>{
    res.json({message:"hello from test api"});

})



app.listen(7000,()=>{
    console.log("server running on localhost:7000");
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
        console.log('connected to mongoose')
    }).catch((err)=>console.log(err))
   
})