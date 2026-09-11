import express from "express";
import dotenv from "dotenv";
import {connectDb} from "./database/db.js";
import userRoutes from "./routes/user.js";
import subjectRoutes from "./routes/subject.js";
import chapterRoutes from "./routes/chapter.js";
import materialRoutes from "./routes/material.js";
import cors from "cors"



dotenv.config();

const app=express()
//using middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));


app.use("/uploads", express.static("uploads"));

const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("server is working");
})

app.use('/api',userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api", chapterRoutes);
app.use("/api/material", materialRoutes);
app.listen(5000,()=>{
    console.log(`Server is running on ${port}`);
    connectDb();
})