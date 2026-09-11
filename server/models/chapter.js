import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
        trim:true,
    },

    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true,
    },
},

{
    timestamps:true,
}


);

export const Chapter = mongoose.model("Chapter",chapterSchema);